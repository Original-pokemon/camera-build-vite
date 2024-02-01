import {
  createSlice,
} from '@reduxjs/toolkit';
import { ProductType } from '../../../types';
import { Action } from '../../../const';
import { ModalNamesType } from '../../../types/modal';

type InitialModalStateType = {
  selectedProduct: ProductType | null;
  activeModal: ModalNamesType | null;
}

const initialState: InitialModalStateType = {
  selectedProduct: null,
  activeModal: null
};

export const modalSlice = createSlice({
  name: Action.Modal,
  initialState,
  reducers: {
    showModal(state, action: { payload: ModalNamesType | null }) {
      state.activeModal = action.payload;
    },
    selectProduct(state, action: { payload: ProductType | null }) {
      state.selectedProduct = action.payload;
    }
  }
});

export default modalSlice.reducer;
