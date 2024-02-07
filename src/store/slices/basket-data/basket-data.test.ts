import faker from 'faker';
import { NameSpace, Status } from '../../../const';
import { generateBasketItemMock, generateProductMock } from '../../../utils/mocks';
import { basketSlice, initialBasketStateType } from './basket-data';
import { addToBasket, removeProduct } from './basket-data-selectors';
import { getBasketItems, getBasketTotal, getBasketItem } from './basket-data-selectors';


describe('Basket data slice', () => {
  describe('Basket data actions', () => {
    const reducer = basketSlice.reducer;

    it('addToBasket action adds new item if it does not exist in the basket', () => {
      const product = generateProductMock();
      const initialState = {
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

    it('removeProduct action decreases quantity of existing item in the basket if quantity > 1', () => {
      const productId = 1;
      const initialState: initialBasketStateType = {
        status: Status.Idle,
        ids: [1],
        entities: {
          [productId]: generateBasketItemMock(2),
        }
      };

      const newState = reducer(initialState, removeProduct(productId));
      const result = newState.entities[productId]?.quantity;

      expect(result).toBe(1);
    });

    it('removeProduct action removes item from the basket if quantity is 1', () => {
      const productId = 1;
      const initialState: initialBasketStateType = {
        status: Status.Idle,
        ids: [productId],
        entities: {
          [productId]: generateBasketItemMock(1),
        },
      };

      const newState = reducer(initialState, removeProduct(productId));
      const result = newState.entities[productId];

      expect(result).toBeUndefined();
    });
  });

  describe('Basket data selectors', () => {
    const initialState = {
      [NameSpace.Basket]: {
        status: Status.Idle,
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
  });
});


