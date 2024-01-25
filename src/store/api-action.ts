import { AxiosInstance } from 'axios';
import { AppDispatchType, ProductType, PromoType, ReviewType, StateType } from '../types';
import { getProduct, getProducts, getPromos, getReviews, getSimilarProducts } from './action';
import { Action } from '../const/store';
import { APIRoute } from '../const';
import { createAsyncThunk } from '@reduxjs/toolkit';

type asyncThunkConfig = {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
};


export const fetchProducts = createAsyncThunk<void, undefined, asyncThunkConfig>(
  `${Action.Data}/fetchProducts`,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<ProductType[]>(APIRoute.Products);

      dispatch(getProducts(data));
    } catch {
      dispatch(getProducts([]));
    }
  }
);

export const fetchProduct = createAsyncThunk<void, number, asyncThunkConfig>(
  `${Action.Data}/fetchProducts`,
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<ProductType>(APIRoute.Product(id));

      dispatch(getProduct(data));
    } catch {
      console.log('error'); // ToDO: handle error
    }
  }
);


export const fetchPromos = createAsyncThunk<void, undefined, asyncThunkConfig>(
  `${Action.Data}/fetchPromos`,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<PromoType[]>(APIRoute.Promo);

      const promises = data.map(async (promo) => {
        const { data: product } = await api.get<ProductType>(APIRoute.Product(promo.id));

        return { ...promo, description: product.description };
      });

      const promo = await Promise.all(promises);

      dispatch(getPromos(promo));
    } catch {
      dispatch(getPromos([]));
    }
  }
);

export const fetchSimilarProducts = createAsyncThunk<void, number, asyncThunkConfig>(
  `${Action.Data}/fetchSimilarProducts`,
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<ProductType[]>(APIRoute.SimilarProducts(id));

      dispatch(getSimilarProducts(data));
    } catch {
      dispatch(getSimilarProducts([]));
    }
  }
);

export const fetchReviews = createAsyncThunk<void, number, asyncThunkConfig>(
  `${Action.Data}/fetchReviews`,
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<ReviewType[]>(APIRoute.ReviewsList(id));

      dispatch(getReviews(data));

    } catch {
      dispatch(getReviews([]));
    }
  }
);
