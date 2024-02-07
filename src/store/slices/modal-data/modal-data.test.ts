import { modalSlice } from './modal-data';
import { ModalName } from '../../../const';
import { generateProductMock } from '../../../utils/mocks';

describe('Modal data slice', () => {
  const reducer = modalSlice.reducer;

  it('should handle showModal action', () => {
    const initialState = {
      selectedProduct: null,
      activeModal: null
    };
    const newState = reducer(initialState, modalSlice.actions.showModal(ModalName.ProductAdd));
    expect(newState.activeModal).toEqual(ModalName.ProductAdd);
  });

  it('should handle selectProduct action', () => {
    const initialState = {
      selectedProduct: null,
      activeModal: null
    };

    const newProduct = generateProductMock();
    const newState = reducer(initialState, modalSlice.actions.selectProduct(newProduct));

    expect(newState.selectedProduct).toEqual(newProduct);
  });
});
