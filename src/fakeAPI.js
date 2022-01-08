import axios from 'axios';

const BASE_API_ENDPOINT = "http://localhost:8000/"; 
export default axios.create({
  baseURL: BASE_API_ENDPOINT
});