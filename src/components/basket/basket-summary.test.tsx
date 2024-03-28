//проверка корректного ввода купона
//проверка отправки заказа

import { MemoryHistory, createMemoryHistory } from 'history';
import { extractActionsTypes, generateBasketItemMock, generateMockState } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { NameSpace, Status } from '../../const';
import BasketSummary from './basket-summary';
import { getProductPriceFormat } from '../../utils/product';
import userEvent from '@testing-library/user-event';
import { postCoupon, postOrder } from '../../store/slices/basket-data/basket-data-thunk';
import APIRoute from '../../store/api-route';

const PRODUCT_ID = 'basket-item';

vi.mock('./basket-item', () => ({
  default: () => <div data-testid={PRODUCT_ID}>Product in Basket</div>
}));

const PRODUCTS_LENGTH = 5;
const COUPON_DISCOUNT = 15;

describe('BasketSummary component', () => {
  let mockHistory: MemoryHistory;
  const basketStorage = Array.from({ length: PRODUCTS_LENGTH }, () => generateBasketItemMock(2));
  const basketStoreData = {
    [NameSpace.Basket]: {
      couponPostStatus: Status.Idle,
      coupon: COUPON_DISCOUNT,
      status: Status.Idle,
      ids: [basketStorage[0].id, basketStorage[1].id, basketStorage[2].id, basketStorage[3].id, basketStorage[4].id],
      entities: {
        [basketStorage[0].id]: basketStorage[0],
        [basketStorage[1].id]: basketStorage[1],
        [basketStorage[2].id]: basketStorage[2],
        [basketStorage[3].id]: basketStorage[3],
        [basketStorage[4].id]: basketStorage[4],
      }
    }
  };
  const basketSummaryPrice = basketStorage.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const debounceTime = 700;
  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('renders correctly', () => {
    const withHistoryComponent = withHistory(<BasketSummary />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(basketStoreData));

    render(withStoreComponent);

    expect(screen.getByText('Промокод')).toBeInTheDocument();
  });

  it('correctly calculate summary price', () => {
    const withHistoryComponent = withHistory(<BasketSummary />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(basketStoreData));

    render(withStoreComponent);

    const summaryPriceElem = screen.getByText(`${getProductPriceFormat(basketSummaryPrice)} ₽`);

    expect(summaryPriceElem).toBeInTheDocument();
  });


  it('correctly calculate coupon cost', () => {
    const withHistoryComponent = withHistory(<BasketSummary />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(basketStoreData));
    const coupon = basketSummaryPrice * (COUPON_DISCOUNT / 100);

    render(withStoreComponent);

    const couponPriceElem = screen.getByText(`${getProductPriceFormat(coupon)} ₽`);

    expect(couponPriceElem).toBeInTheDocument();
  });

  it('correctly calculate total price', () => {
    const withHistoryComponent = withHistory(<BasketSummary />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(basketStoreData));
    const coupon = basketSummaryPrice * (COUPON_DISCOUNT / 100);
    const total = basketSummaryPrice - coupon;

    render(withStoreComponent);

    const totalElem = screen.getByText(`${getProductPriceFormat(total)} ₽`);

    expect(totalElem).toBeInTheDocument();

  }
  );

  it('coupon input is available', async () => {
    const withHistoryComponent = withHistory(<BasketSummary />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(basketStoreData));
    const placeholderText = 'Введите промокод';
    const inputText = 'text';

    render(withStoreComponent);

    const couponInput = screen.getByPlaceholderText(placeholderText);

    await userEvent.type(couponInput, inputText);
    await new Promise((r) => setTimeout(r, debounceTime));

    expect(screen.getByDisplayValue(inputText)).toBeInTheDocument();
  });

  it('The promo code field only accepts a one-word promo code and must not accept a space', async () => {
    const withHistoryComponent = withHistory(<BasketSummary />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(basketStoreData));
    const placeholderText = 'Введите промокод';
    const inputText = ' text  text 2';

    render(withStoreComponent);

    const couponInput = screen.getByPlaceholderText(placeholderText);


    await userEvent.type(couponInput, inputText);
    await new Promise((r) => setTimeout(r, debounceTime));

    expect(screen.getByDisplayValue('text')).toBeInTheDocument();
  });

  it('correctly send coupon data', async () => {
    const withHistoryComponent = withHistory(<BasketSummary />, mockHistory);
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(withHistoryComponent, generateMockState(basketStoreData));
    const placeholderText = 'Введите промокод';
    const inputText = 'camera-333';
    mockAxiosAdapter.onPost(APIRoute.Coupon).reply(200, []);

    render(withStoreComponent);

    const couponInput = screen.getByPlaceholderText(placeholderText);
    const couponButton = screen.getByText('Применить');

    await userEvent.type(couponInput, inputText);
    await new Promise((r) => setTimeout(r, debounceTime));

    expect(screen.getByDisplayValue(inputText)).toBeInTheDocument();

    await userEvent.click(couponButton);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      postCoupon.pending.type,
      postCoupon.fulfilled.type
    ]);
  });

  it('correctly send order data', async () => {
    const withHistoryComponent = withHistory(<BasketSummary />, mockHistory);
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(withHistoryComponent, generateMockState(basketStoreData));
    const buttonText = 'Оформить заказ';

    mockAxiosAdapter.onPost(APIRoute.Orders).reply(200, []);

    render(withStoreComponent);

    const submitButton = screen.getByText(buttonText);

    await userEvent.click(submitButton);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      postOrder.pending.type,
      postOrder.fulfilled.type
    ]);

  });

  it('The label will be displayed if the promo is correct', () => {
    const withHistoryComponent = withHistory(<BasketSummary />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState({
      [NameSpace.Basket]: {
        couponPostStatus: Status.Success,
        coupon: null,
        status: Status.Idle,
        ids: [basketStorage[0].id, basketStorage[1].id, basketStorage[2].id, basketStorage[3].id, basketStorage[4].id],
        entities: {
          [basketStorage[0].id]: basketStorage[0],
          [basketStorage[1].id]: basketStorage[1],
          [basketStorage[2].id]: basketStorage[2],
          [basketStorage[3].id]: basketStorage[3],
          [basketStorage[4].id]: basketStorage[4],
        }
      }
    }));

    const text = 'Промокод принят!';

    render(withStoreComponent);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('The label will be displayed if the promo is not correct', () => {
    const withHistoryComponent = withHistory(<BasketSummary />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState({
      [NameSpace.Basket]: {
        couponPostStatus: Status.Error,
        coupon: null,
        status: Status.Idle,
        ids: [basketStorage[0].id, basketStorage[1].id, basketStorage[2].id, basketStorage[3].id, basketStorage[4].id],
        entities: {
          [basketStorage[0].id]: basketStorage[0],
          [basketStorage[1].id]: basketStorage[1],
          [basketStorage[2].id]: basketStorage[2],
          [basketStorage[3].id]: basketStorage[3],
          [basketStorage[4].id]: basketStorage[4],
        }
      }
    }));
    const text = 'Промокод неверный';

    render(withStoreComponent);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
