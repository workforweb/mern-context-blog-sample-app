import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-type': 'application/json',
  },
});

export default client;
