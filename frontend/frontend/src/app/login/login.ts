import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//import jwtDecode from 'jwt-decode';  // fixed import for jwt-decode
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterModule, NgIf, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  email = '';  // will be auto-generated
  password = '';

  loginSuccessMessage = '';
  loginErrorMessage = '';

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }



  login() {
    this.loginSuccessMessage = '';
    this.loginErrorMessage = '';
  
    // Validate email format and username length
    const emailPattern = /^([a-zA-Z0-9._%+-]+)@mmc\.com$/;
    const match = this.email.match(emailPattern);
  
    const hasLetter = /[a-zA-Z]/.test(this.password);
    const hasNumber = /\d/.test(this.password);
  
    if (
      !match || // email format invalid
      match[1].length < 5 || match[1].length > 9 || // username length invalid
      !hasLetter || !hasNumber // password complexity invalid
    ) {
      alert('Wrong email or password');
      this.loginErrorMessage = 'Wrong email or password';
      return;
    }
  
    // Proceed with login
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
  
          this.auth.setAuth(res.token, res.role, res.username);
          this.router.navigate(['/dashboard']);
        } catch (e) {
          console.warn('Token decode failed', e);
          this.loginErrorMessage = 'Failed to parse token';
        }
      },
      error: (err) => {
        alert('Wrong email or password');
        this.loginErrorMessage = 'Wrong email or password';
      }
    });
  }
}