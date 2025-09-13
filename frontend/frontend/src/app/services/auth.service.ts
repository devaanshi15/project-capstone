import { Injectable } from '@angular/core';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   getToken() {
//     return localStorage.getItem('token');
//   }
//   setAuth(token: string, role: string, username: string) {
//     localStorage.setItem('token', token);
//     localStorage.setItem('role', role);
//     localStorage.setItem('username', username);
//   }
//   clearAuth() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     localStorage.removeItem('username');
//   }
//   getRole(): string | null {
//     return localStorage.getItem('role');
//   }
//   getUsername(): string | null {
//     return localStorage.getItem('username');
//   }
// }



@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem('user_role');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  // This is the method you should call to save auth info
  setAuth(token: string, role: string, username: string) {
    this.setToken(token);
    localStorage.setItem('user_role', role);
    localStorage.setItem('username', username);
  }

  // This is the method you should call to clear auth info
  clearAuth() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user_role');
    localStorage.removeItem('username');
  }
}
