import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getToken() {
    return localStorage.getItem('token');
  }
  setAuth(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }
  clearAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
  getRole(): string | null {
    return localStorage.getItem('role');
  }
}
