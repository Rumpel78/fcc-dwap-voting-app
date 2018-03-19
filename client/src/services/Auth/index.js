/* global localStorage */

class Auth {
  /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  /**
     * Get a token value.
     *
     * @returns {string}
     */

  static getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Logs in user with username and password
   * @param {string} name
   * @param {string} password
   * @param {function} callback
   */
  static login(name, password, callback) {
    const formData = `username=${name}&password=${password}`;

    fetch('/auth/login', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json, application/xml, text/play, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    })

      .then(response => response.json())

      .then((json) => {
        if (json.success) {
          this.authenticateUser(json.token);
        }
        callback(json);
      });
  }
}

export default Auth;
