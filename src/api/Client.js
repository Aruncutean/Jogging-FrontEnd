import axios from 'axios';

const Client = axios.create({

  baseURL: `http://localhost:3000/`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});


export default Client;
