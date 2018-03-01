/* global localStorage */

class User {
  static saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static isUserAvailable() {
    return localStorage.getItem('user') !== null;
  }

  static removeUser() {
    localStorage.removeItem('user');
  }

  static getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default User;
