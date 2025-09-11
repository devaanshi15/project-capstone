import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterModule, NgIf, CommonModule],
  templateUrl: './login.html',
  styleUrls: []
})
export class Login {
  email = '';
  password = '';

  loginSuccessMessage = '';
  loginErrorMessage = '';

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  login() {
    this.loginSuccessMessage = '';
    this.loginErrorMessage = '';

    this.http.post<any>('http://localhost:5000/api/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.loginSuccessMessage = res.message || 'Login successful!';
        const token = res.token;

        try {
          const decoded: any = jwtDecode(token);
          const role = decoded.user?.role || 'candidate';

          // Save token and role
          this.auth.setAuth(token, role);

          // Navigate to the dashboard for **all roles**
          this.router.navigate(['/dashboard']);

        } catch (e) {
          console.warn('Token decode failed', e);
          this.loginErrorMessage = 'Failed to parse token';
        }
      },
      error: (err) => {
        this.loginErrorMessage = err.error?.error || 'Login failed. Please try again.';
      }
    });
  }
}
