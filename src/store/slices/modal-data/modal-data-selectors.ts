import { Action } from '../../../const';
import { InitialStateType } from '../../reducer';
import { modalSlice } from './modal-data';

export const getActiveModal = (state: InitialStateType) => state[Action.Modal].activeModal;
export const getSelectedProduct = (state: InitialStateType) => state[Action.Modal].selectedProduct;
export const { selectProduct, showModal } = modalSlice.actions;
