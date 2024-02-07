import { render, screen } from '@testing-library/react';
import CatalogFilter from './catalog-filter';

describe('CatalogFilter component', () => {
  it('renders without crashing', () => {
    render(<CatalogFilter />);
  });

  it('renders all filter blocks with correct legends', () => {
    const priceText = 'Цена, ₽';
    const categoryText = 'Категория';
    const cameraTypeText = 'Тип камеры';
    const levelText = 'Уровень';

    render(<CatalogFilter />);

    expect(screen.getByText(priceText)).toBeInTheDocument();
    expect(screen.getByText(categoryText)).toBeInTheDocument();
    expect(screen.getByText(cameraTypeText)).toBeInTheDocument();
    expect(screen.getByText(levelText)).toBeInTheDocument();
  });

  it('renders correct number of CustomInput components', () => {
    render(<CatalogFilter />);
    const priceInputs = screen.getAllByRole('spinbutton');
    expect(priceInputs).toHaveLength(2);
  });

  it('renders correct number of FilterItem components', () => {
    render(<CatalogFilter />);
    const filterItems = screen.getAllByRole('checkbox');
    expect(filterItems).toHaveLength(9);
  });

  it('should render reset button', () => {
    render(<CatalogFilter />);
    const resetButton = screen.getByText('Сбросить фильтры');

    expect(resetButton).toBeInTheDocument();
  });
});
