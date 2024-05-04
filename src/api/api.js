import axios from 'axios';

const request = {
  get: async path => {
    return axios.get(path);
  },
};

export default request;
