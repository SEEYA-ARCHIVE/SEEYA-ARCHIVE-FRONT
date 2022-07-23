import axios from 'axios';

export const initAxiosConfig = () => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_HOST;
  axios.defaults.timeout = 3000;
  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
};
