import { NameSpace } from '../../../const';
import { InitialStateType } from '../../reducer';
import { modalSlice } from './modal-data';

export const getActiveModal = (state: InitialStateType) => state[NameSpace.Modal].activeModal;
export const getSelectedProduct = (state: InitialStateType) => state[NameSpace.Modal].selectedProduct;
export const { selectProduct, showModal } = modalSlice.actions;
