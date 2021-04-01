import axios from 'axios';

export { default as MediaSearchAPI } from './MediaSearchAPI';

axios.defaults.baseURL = 'https://api.nasa.gov';

axios.interceptors.request.use(function (config) {
  const params = config.params || {};
  config.params = {
    ...params,
    api_key: process.env.REACT_APP_API_KEY,
  };

  return config;
});

console.log(axios.defaults);

export function get(url, { params } = {}) {
  return axios.get(url, { params });
}

const Api = {
  get,
};

export default Api;
