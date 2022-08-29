import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from './token';

const BASE_URL = 'https://10.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (callback: (error: number) => void): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response) {
        callback(error.response?.status);
      }
      throw error;
    });

  return api;
};
