import { MemoryHistory, createMemoryHistory } from 'history';
import { generateMockState, generatePromosMock } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import PromoSlider from './promo-slider';
import { NameSpace, Status } from '../../const';
import { render, screen } from '@testing-library/react';


describe('Banner component', () => {
  let mockHistory: MemoryHistory;
  const promos = generatePromosMock();
  const initialState = {
    [NameSpace.Promo]: {
      promos,
      status: Status.Success
    }
  };

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });


  it('renders correctly', () => {
    const withHistoryComponent = withHistory(<PromoSlider />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(initialState));
    render(withStoreComponent);

    const promoSliderElement = screen.getByTestId('promo-slider');
    expect(promoSliderElement).toBeInTheDocument();
  });

  it('correctly calculates visiblePromos', () => {
    const withHistoryComponent = withHistory(<PromoSlider />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(initialState));
    render(withStoreComponent);

    const sliderElements = screen.getAllByTestId('slide');
    expect(sliderElements).toHaveLength(promos.length);
  });
});
