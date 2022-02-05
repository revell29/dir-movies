import axios, { AxiosRequestConfig } from 'axios';

export const fetcher = async (url: string, params?: AxiosRequestConfig) =>
  axios.get(url, params).then((res) => res);
