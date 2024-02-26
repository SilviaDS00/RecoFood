import { ENV } from "../utils/constant";
import { jwtDecode } from 'jwt-decode';

export class Token {
  setToken(token) {
    localStorage.setItem(ENV.TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(ENV.TOKEN);
  }

  removeToken() {
    localStorage.removeItem(ENV.TOKEN);
  }

  hasExpiredToken(token) {
    if (!token) {
      return true;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; 
    }
  }

}
