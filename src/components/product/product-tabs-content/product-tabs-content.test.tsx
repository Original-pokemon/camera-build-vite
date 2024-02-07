import { render, screen, fireEvent } from '@testing-library/react';
import ProductTabsContent from './product-tabs-content';
import { generateProductMock } from '../../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory } from '../../../utils/mock-component';


describe('ProductTabsContent component', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });


  const props = generateProductMock();

  it('renders tabs controls and content correctly', () => {
    const withHistoryComponent = withHistory(<ProductTabsContent {...props} />, mockHistory);
    render(withHistoryComponent);

    const featuresTabButton = screen.getByText('Характеристики');
    const descriptionTabButton = screen.getByText('Описание');
    expect(featuresTabButton).toBeInTheDocument();
    expect(descriptionTabButton).toBeInTheDocument();

    const descriptionTabContent = screen.getByText(props.description);
    expect(descriptionTabContent).toBeInTheDocument();
  });

  it('switches between tabs when clicked', () => {
    const withHistoryComponent = withHistory(<ProductTabsContent {...props} />, mockHistory);
    render(withHistoryComponent);

    const featuresTabButton = screen.getByText('Характеристики');
    fireEvent.click(featuresTabButton);

    expect(featuresTabButton).toHaveClass('is-active');
    expect(mockHistory.location.search).toContain('features');


    const descriptionTabButton = screen.getByText('Описание');
    fireEvent.click(descriptionTabButton);

    expect(mockHistory.location.search).toContain('description');
    expect(descriptionTabButton).toHaveClass('is-active');

    const descriptionTabContent = screen.getByText(props.description);
    expect(descriptionTabContent).toBeInTheDocument();
  });
});
