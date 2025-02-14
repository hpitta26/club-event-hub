import axios from 'axios';

const backend = axios.create({
    baseURL: '/api',
    withCredentials: true
});

export default backend;
  