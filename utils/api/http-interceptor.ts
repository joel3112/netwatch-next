import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { APIResponseError } from '@/types';

// Spanish Language - Spain
const language = 'es-ES'; //  ISO 639-1
const region = 'ES'; //  ISO 3166-1

export const httpInterceptor = () => {
  // Add a request interceptor
  axios.interceptors.request.use(
    (request: AxiosRequestConfig) => {
      // Do something before request is sent
      request.params = {
        api_key: process.env.API_KEY,
        language,
        region,
        watch_region: region,
        ...request.params
      };

      return request;
    },
    (error: APIResponseError) => {
      // Do something with request error
      console.error(error);
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response || {};
    },
    (error: APIResponseError) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.error(error);
      return Promise.reject(error);
    }
  );
};
