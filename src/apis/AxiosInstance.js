import axios from "axios";
import Cookie from 'cookie-universal'
const cookies = Cookie()
export const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {'Authorization': 'Bearer '+cookies.get('login_token')}
  });
