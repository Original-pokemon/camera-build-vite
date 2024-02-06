import { NameSpace, Status } from '../../../const';
import { getAllPromos, getPromoStatus } from './promo-data-selectors';
import { generatePromoMock } from '../../../utils/mocks';

describe('Promo data slice', () => {
  describe('Promo data selectors', () => {
    const initialState = {
      [NameSpace.Promo]: {
        status: Status.Idle,
        promos: [
          generatePromoMock(),
          generatePromoMock(),
          generatePromoMock()
        ]
      },
    };

    it('getAllPromos selector returns all promo items', () => {
      const result = getAllPromos(initialState);
      expect(result).toEqual(initialState[NameSpace.Promo].promos);
    });

    it('getPromoStatus selector returns correct promo status', () => {
      const result = getPromoStatus(initialState);
      expect(result).toBe(Status.Idle);
    });
  });

});
