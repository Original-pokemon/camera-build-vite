import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { BACKEND_URL, REQUEST_TIMEOUT } from './const';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';
import browserHistory from '../browser-history/browser-history';
import { AppRoute } from '../const/app-route';

type DetailMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);
        toast.warn<string>(detailMessage.message);
      }

      if (error.response?.status === StatusCodes.NOT_FOUND) {
        browserHistory.push(AppRoute.PageNotFound);
      }

      throw error;
    }
  );

  return api;
};

