import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   getToken() {
//     return localStorage.getItem('token');
//   }
//   setAuth(token: string, role: string) {
//     localStorage.setItem('token', token);
//     localStorage.setItem('role', role);
//   }
//   clearAuth() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//   }
//   getRole(): string | null {
//     return localStorage.getItem('role');
//   }
// }


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getToken() {
    return localStorage.getItem('token');
  }
  setAuth(token: string, role: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
  }
  clearAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
  }
  getRole(): string | null {
    return localStorage.getItem('role');
  }
  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}
