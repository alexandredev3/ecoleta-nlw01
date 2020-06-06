import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333'
  // Nos estamos usando o axios, pra quando nossa api estiver em outro lugar, e so muda a url aqui.
});

export default api;