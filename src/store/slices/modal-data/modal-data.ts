import {
  createSlice,
} from '@reduxjs/toolkit';
import { ProductType } from '../../../types';
import { NameSpace } from '../../../const';
import { ModalNamesType } from '../../../types/modal';

type InitialModalStateType = {
  selectedProduct: ProductType | null;
  activeModal: ModalNamesType | null;
}

const initialState: InitialModalStateType = {
  selectedProduct: null,
  activeModal: null
};

const modalSlice = createSlice({
  name: NameSpace.Modal,
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

export {
  modalSlice,
};
