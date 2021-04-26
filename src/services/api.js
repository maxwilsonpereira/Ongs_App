import axios from 'axios';
const api = axios.create({
  // IP:PORT -> look on the browser after run "npm run web" OR ipconfig on the terminal:
  baseURL: 'http://10.0.0.3:3333',
});
export default api;
