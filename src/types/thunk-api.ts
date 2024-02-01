import { AxiosInstance } from 'axios';
import { AppDispatchType, StateType } from '.';
import { Status } from '../const';

export type asyncThunkConfig = {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
};

export type StatusType = typeof Status[keyof typeof Status];
