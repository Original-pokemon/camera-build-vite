import faker from 'faker';
import { NameSpace, Status } from '../../../const';
import { generateBasketItemMock, generateProductMock } from '../../../utils/mocks';
import { basketSlice, initialBasketStateType } from './basket-data';
import { addToBasket, changeProductQuantity, decreaseProductQuantity, getBasketIds, getCoupon, getCouponStatus, getOrderStatus, increaseProductQuantity, removeProduct, resetBasket, setBasket } from './basket-data-selectors';
import { getBasketItems, getBasketTotal, getBasketItem } from './basket-data-selectors';


describe('Basket data slice', () => {
  describe('Basket data actions', () => {
    const reducer = basketSlice.reducer;

    it('addToBasket action adds new item if it does not exist in the basket', () => {
      const product = generateProductMock();
      const initialState = {
        coupon: null,
        couponPostStatus: Status.Idle,
        status: Status.Idle,
        ids: [],
        entities: {},
      };

      const result = basketSlice.reducer(initialState, addToBasket(product));
      expect(result.entities[product.id]?.quantity).toBe(1);
    });

    it('addToBasket action increases quantity of existing item in the basket', () => {
      const product = generateProductMock();
      const initialState: initialBasketStateType = {
        coupon: null,
        couponPostStatus: Status.Idle,
        status: Status.Idle,
        ids: [product.id],
        entities: {
          [product.id]: { ...product, quantity: 1 },
        },
      };

      const newState = reducer(initialState, addToBasket(product));
      const result = newState.entities[product.id]?.quantity;
      expect(result).toBe(2);
    });

    it('increaseProductQuantity action increases quantity of existing item in the basket', () => {
      const productId = 1;
      const initialState: initialBasketStateType = {
        coupon: null,
        couponPostStatus: Status.Idle,
        status: Status.Idle,
        ids: [productId],
        entities: {
          [productId]: generateBasketItemMock(1),
        }
      };

      const newState = reducer(initialState, increaseProductQuantity(productId));
      const result = newState.entities[productId]?.quantity;

      expect(result).toBe(2);
    }
    );

    it('decreaseProductQuantity action decreases quantity of existing item in the basket if quantity > 1', () => {
      const productId = 1;
      const initialState: initialBasketStateType = {
        coupon: null,
        couponPostStatus: Status.Idle,
        status: Status.Idle,
        ids: [1],
        entities: {
          [productId]: generateBasketItemMock(2),
        }
      };

      const newState = reducer(initialState, decreaseProductQuantity(productId));
      const result = newState.entities[productId]?.quantity;

      expect(result).toBe(1);
    });

    it('decreaseProductQuantity action removes item from the basket if quantity is 1', () => {
      const productId = 1;
      const initialState: initialBasketStateType = {
        coupon: null,
        couponPostStatus: Status.Idle,
        status: Status.Idle,
        ids: [productId],
        entities: {
          [productId]: generateBasketItemMock(1),
        },
      };

      const newState = reducer(initialState, decreaseProductQuantity(productId));
      const result = newState.ids.length;

      expect(result).toBe(0);
    });

    it('removeProduct action decreases quantity of existing item in the basket if quantity > 1', () => {
      const productId = 1;
      const initialState: initialBasketStateType = {
        coupon: null,
        couponPostStatus: Status.Idle,
        status: Status.Idle,
        ids: [1],
        entities: {
          [productId]: generateBasketItemMock(2),
        }
      };

      const newState = reducer(initialState, removeProduct(productId));
      const result = newState.ids.length;

      expect(result).toBe(0);
    });

    it('changeProductQuantity action changes quantity of existing item in the basket', () => {
      const productId = 1;
      const initialState: initialBasketStateType = {
        coupon: null,
        couponPostStatus: Status.Idle,
        status: Status.Idle,
        ids: [1],
        entities: {
          [productId]: generateBasketItemMock(2),
        }
      };

      const newState = reducer(initialState, changeProductQuantity({ id: productId, quantity: 5 }));
      const result = newState.entities[productId]?.quantity;

      expect(result).toBe(5);
    });

    it('setBasket action sets new basket', () => {
      const product = generateBasketItemMock(3);
      const initialState = {
        coupon: null,
        couponPostStatus: Status.Idle,
        status: Status.Idle,
        ids: [],
        entities: {},
      };

      const result = basketSlice.reducer(initialState, setBasket([product]));
      expect(result).toEqual({
        coupon: null,
        couponPostStatus: Status.Idle,
        status: Status.Idle,
        ids: [product.id],
        entities: {
          [product.id]: product
        }
      });
    });

    it('resetBasket action resets basket', () => {
      const initialState = {
        coupon: null,
        couponPostStatus: Status.Idle,
        status: Status.Idle,
        ids: [1, 2, 3],
        entities: {
          1: generateBasketItemMock(1),
          2: generateBasketItemMock(2),
          3: generateBasketItemMock(3),
        }
      };

      const result = basketSlice.reducer(initialState, resetBasket());
      expect(result).toEqual({
        coupon: null,
        couponPostStatus: Status.Idle,
        status: Status.Idle,
        ids: [],
        entities: {},
      });
    });
  });

  describe('Basket data selectors', () => {
    const initialState = {
      [NameSpace.Basket]: {
        coupon: 60,
        couponPostStatus: Status.Loading,
        status: Status.Loading,
        ids: [1, 2, 3],
        entities: {
          1: generateBasketItemMock(faker.datatype.number()),
          2: generateBasketItemMock(faker.datatype.number()),
          3: generateBasketItemMock(faker.datatype.number()),
        },
      },
    };

    it('getBasketItems selector returns all basket items', () => {
      const entitiesArr = Object.values(initialState[NameSpace.Basket].entities);
      const result = getBasketItems(initialState);
      expect(result).toEqual(entitiesArr);
    });

    it('getBasketTotal selector returns correct total price', () => {
      const totalEntities = Object.values(initialState[NameSpace.Basket].entities).length;
      const result = getBasketTotal(initialState);
      expect(result).toBe(totalEntities);
    });

    it('getBasketItem selector returns correct product by id', () => {
      const product = initialState[NameSpace.Basket].entities[1];
      const result = getBasketItem(initialState, 1);
      expect(result).toEqual(product);
    });

    it('selectIds selector returns correct ids', () => {
      const ids = initialState[NameSpace.Basket].ids;
      const result = getBasketIds(initialState);
      expect(result).toEqual(ids);
    });

    it('getCoupon selector returns correct coupon', () => {
      const coupon = initialState[NameSpace.Basket].coupon;
      const result = getCoupon(initialState);
      expect(result).toEqual(coupon);
    });

    it('getOrderStatus selector returns correct status', () => {
      const status = initialState[NameSpace.Basket].status;
      const result = getOrderStatus(initialState);
      expect(result).toEqual(status);
    });

    it('getCouponStatus selector returns correct status', () => {
      const status = initialState[NameSpace.Basket].status;
      const result = getCouponStatus(initialState);
      expect(result).toEqual(status);
    });
  });
});

