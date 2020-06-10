import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.6:3333'
  // Coloque o api que você esta usando no expo
});

export default api;