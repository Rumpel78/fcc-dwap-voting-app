/* global localStorage */

import config from '../../config';
import User from '../../types/User';

class Auth {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  public static authenticateUser(token: string) {
    localStorage.setItem('token', token);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  public static isUserAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  public static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  public static getToken(): string {
    return localStorage.getItem('token') || '';
  }

  public static getUser(cb: (user: User | null) => void) {
    const token = this.getToken();

    if (!token) {
      cb(null);
      return;
    }

    fetch(`${config.basePath}/auth/user`, {
      headers: {
        'x-auth-token': token,
      },
      method: 'GET',
    })
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          this.authenticateUser(json.token);
        }
        cb(json);
      });
  }

  /**
   * Logs in user with username and password
   * @param {string} name
   * @param {string} password
   * @param {function} callback
   */
  public static login(name: string, password: string, callback: (json: any) => void) {
    const formData = `username=${name}&password=${password}`;

    fetch(`${config.basePath}/auth/login`, {
      body: formData,
      headers: {
        'Accept': 'application/json, application/xml, text/play, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      method: 'POST',
    })

      .then((response) => {
        const token = response.headers.get('x-auth-token');
        if (token) {
          this.authenticateUser(token);
        }
        return response.json();
      })

      .then((json) => {
        callback(json);
      });
  }

  public static register(name: string, password: string, cb: (json: any) => void) {
    const formData = `username=${name}&password=${password}`;

    fetch(`${config.basePath}/auth/signup`, {
      body: formData,
      headers: {
        'Accept': 'application/json, application/xml, text/play, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      method: 'POST',
    })

      .then((response) => {
        const token = response.headers.get('x-auth-token');
        if (token) {
          this.authenticateUser(token);
        }
        return response.json();
      })

      .then((json) => {
        cb(json);
      });
  }
}

export default Auth;
