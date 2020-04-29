import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-fa2bc.firebaseio.com/',
});

export default instance;
