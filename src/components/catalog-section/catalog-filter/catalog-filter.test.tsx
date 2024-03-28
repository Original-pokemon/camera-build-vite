import { render, screen } from '@testing-library/react';

import { withHistory } from '../../../utils/mock-component';
import CatalogFilter from './catalog-filter';
import { MemoryHistory, createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { MAX_PRICE_NAME, MIN_PRICE_NAME } from '../const';


describe('CatalogFilter component', () => {
  const price = {
    priceRange: {
      [MIN_PRICE_NAME]: 1,
      [MAX_PRICE_NAME]: 10
    },
    currentPrice: {
      [MIN_PRICE_NAME]: null,
      [MAX_PRICE_NAME]: null
    }
  };

  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('renders without crashing', () => {
    const componentWithHistory = withHistory(<CatalogFilter {...price} />, mockHistory);

    render(componentWithHistory);
  });

  it('renders all filter blocks with correct legends', () => {
    const priceText = 'Цена, ₽';
    const categoryText = 'Категория';
    const cameraTypeText = 'Тип камеры';
    const levelText = 'Уровень';
    const componentWithHistory = withHistory(<CatalogFilter {...price} />, mockHistory);

    render(componentWithHistory);

    expect(screen.getByText(priceText)).toBeInTheDocument();
    expect(screen.getByText(categoryText)).toBeInTheDocument();
    expect(screen.getByText(cameraTypeText)).toBeInTheDocument();
    expect(screen.getByText(levelText)).toBeInTheDocument();
  });

  it('renders correct number of CustomInput components', () => {
    const componentWithHistory = withHistory(<CatalogFilter {...price} />, mockHistory);

    render(componentWithHistory);
    const priceInputs = screen.getAllByRole('spinbutton');
    expect(priceInputs).toHaveLength(2);
  });

  it('renders correct number of FilterItem components', () => {
    const componentWithHistory = withHistory(<CatalogFilter {...price} />, mockHistory);

    render(componentWithHistory);
    const filterItems = screen.getAllByRole('checkbox');
    expect(filterItems).toHaveLength(9);
  });

  it('should render reset button', () => {
    const componentWithHistory = withHistory(<CatalogFilter {...price} />, mockHistory);

    render(componentWithHistory);
    const resetButton = screen.getByText('Сбросить фильтры');

    expect(resetButton).toBeInTheDocument();
  });

  it('filter by category correctly work', async () => {
    const componentWithHistory = withHistory(<CatalogFilter {...price} />, mockHistory);
    const FILTER_VALUE_PHOTOCAMERA = 'category=photocamera';
    const PHOTOCAMERA_LABEL = 'Фотокамера';
    const FILTER_VALUE_VIDEOCAMERA = 'category=videocamera';
    const VIDEOCAMERA_LABEL = 'Видеокамера';

    render(componentWithHistory);

    const photocameraInput = screen.getByLabelText(PHOTOCAMERA_LABEL);
    const videocameraInput = screen.getByLabelText(VIDEOCAMERA_LABEL);

    await userEvent.click(photocameraInput);

    expect(photocameraInput).toBeChecked();
    expect(mockHistory.location.search).toContain(FILTER_VALUE_PHOTOCAMERA);

    await userEvent.click(videocameraInput);

    expect(videocameraInput).toBeChecked();
    expect(mockHistory.location.search).toContain(FILTER_VALUE_VIDEOCAMERA);
  });

  it('filter by camera type correctly work', async () => {
    const componentWithHistory = withHistory(<CatalogFilter {...price} />, mockHistory);
    const SORT_VALUE_DIGITAL = 'type=digital';
    const DIGITAL_LABEL = 'Цифровая';

    render(componentWithHistory);

    const digitalInput = screen.getByLabelText(DIGITAL_LABEL);
    await userEvent.click(digitalInput);

    expect(digitalInput).toBeChecked();
    expect(mockHistory.location.search).toContain(SORT_VALUE_DIGITAL);
  });

  it('filter by camera level correctly work', async () => {
    const componentWithHistory = withHistory(<CatalogFilter {...price} />, mockHistory);
    const FILTER_VALUE_ZERO_LEVEL = 'level=zero';
    const ZERO_LEVEL_LABEL = 'Нулевой';

    render(componentWithHistory);

    const zeroCameraLevelInput = screen.getByLabelText(ZERO_LEVEL_LABEL);
    await userEvent.click(zeroCameraLevelInput);

    expect(zeroCameraLevelInput).toBeChecked();
    expect(mockHistory.location.search).toContain(FILTER_VALUE_ZERO_LEVEL);
  });

  it('price filter wort correctly', async () => {
    const componentWithHistory = withHistory(<CatalogFilter {...price} />, mockHistory);
    const FILTER_VALUE_MIN_PRICE = 'price_min=2';
    const FILTER_VALUE_MAX_PRICE = 'price_max=5';
    const debounceTime = 1200;

    render(componentWithHistory);

    const minPriceInput = screen.getByPlaceholderText(price.priceRange[MIN_PRICE_NAME]);
    const maxPriceInput = screen.getByPlaceholderText(price.priceRange[MAX_PRICE_NAME]);

    await userEvent.type(minPriceInput, '2');
    await new Promise((r) => setTimeout(r, debounceTime));

    await userEvent.type(maxPriceInput, '5');
    await new Promise((r) => setTimeout(r, debounceTime));

    expect(minPriceInput).toHaveValue(2);
    expect(maxPriceInput).toHaveValue(5);

    expect(mockHistory.location.search).toContain(FILTER_VALUE_MIN_PRICE);
    expect(mockHistory.location.search).toContain(FILTER_VALUE_MAX_PRICE);
  });

  it('The minimum price cannot be less than in the placeholder', async () => {
    const debounceTime = 1200;
    const minPrice = 5;
    const FILTER_VALUE_MIN_PRICE = 'price_min=5';
    const componentWithHistory = withHistory(<CatalogFilter {...price} priceRange={{ [MIN_PRICE_NAME]: minPrice, [MAX_PRICE_NAME]: 10 }} />, mockHistory);

    render(componentWithHistory);

    const minPriceInput = screen.getByPlaceholderText(minPrice);

    await userEvent.type(minPriceInput, '2');
    await new Promise((r) => setTimeout(r, debounceTime));


    expect(minPriceInput).toHaveValue(5);

    expect(mockHistory.location.search).toContain(FILTER_VALUE_MIN_PRICE);
  });

  it('The maximum price cannot be more than that of a placeholder ', async () => {
    const debounceTime = 1200;
    const maxPrice = '100';
    const FILTER_VALUE_MAX_PRICE = 'price_max=10';
    const componentWithHistory = withHistory(<CatalogFilter {...price} />, mockHistory);

    render(componentWithHistory);

    const maxPriceInput = screen.getByPlaceholderText(price.priceRange[MAX_PRICE_NAME]);

    await userEvent.type(maxPriceInput, maxPrice);
    await new Promise((r) => setTimeout(r, debounceTime));


    expect(maxPriceInput).toHaveValue(price.priceRange[MAX_PRICE_NAME]);

    expect(mockHistory.location.search).toContain(FILTER_VALUE_MAX_PRICE);
  });

  it('reset button correctly work', async () => {
    const componentWithHistory = withHistory(<CatalogFilter {...price} />, mockHistory);
    const FILTER_VALUE_ZERO_LEVEL = 'level=zero';
    const ZERO_LEVEL_LABEL = 'Нулевой';
    const FILTER_VALUE_DIGITAL = 'type=digital';
    const DIGITAL_LABEL = 'Цифровая';
    const FILTER_VALUE_PHOTOCAMERA = 'category=photocamera';
    const PHOTOCAMERA_LABEL = 'Фотокамера';
    const FILTER_VALUE_MIN_PRICE = 'price_min=2';
    const debounceTime = 1200;

    const RESET_BUTTON_LABEL = 'Сбросить фильтры';

    render(componentWithHistory);

    const zeroCameraLevelInput = screen.getByLabelText(ZERO_LEVEL_LABEL);
    const digitalInput = screen.getByLabelText(DIGITAL_LABEL);
    const photocameraInput = screen.getByLabelText(PHOTOCAMERA_LABEL);
    const resetButton = screen.getByText(RESET_BUTTON_LABEL);
    const minPriceInput = screen.getByPlaceholderText(price.priceRange[MIN_PRICE_NAME]);

    await userEvent.type(minPriceInput, '2');
    await new Promise((r) => setTimeout(r, debounceTime));

    await userEvent.click(zeroCameraLevelInput);
    await userEvent.click(digitalInput);
    await userEvent.click(photocameraInput);

    await userEvent.click(resetButton);

    expect(mockHistory.location.search).not.toContain(FILTER_VALUE_ZERO_LEVEL);
    expect(mockHistory.location.search).not.toContain(FILTER_VALUE_ZERO_LEVEL);
    expect(mockHistory.location.search).not.toContain(FILTER_VALUE_DIGITAL);
    expect(mockHistory.location.search).not.toContain(FILTER_VALUE_PHOTOCAMERA);
    expect(mockHistory.location.search).not.toContain(FILTER_VALUE_MIN_PRICE);
  });
});
