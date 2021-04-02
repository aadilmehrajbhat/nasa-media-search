import axios from 'axios';

export { default as MediaSearchAPI } from './MediaSearchAPI';

axios.defaults.baseURL = 'https://api.nasa.gov';

export function get(url, { params } = {}) {
  return axios.get(url, { params });
}

const Api = {
  get,
};

export default Api;
