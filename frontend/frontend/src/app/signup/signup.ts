import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterModule, NgIf,CommonModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  username = '';
  email = '';
  password = '';
  role = 'candidate';

  signupSuccessMessage = '';
  signupErrorMessage = '';

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  signup() {
    this.signupSuccessMessage = '';
    this.signupErrorMessage = '';
  
    // Username length validation
    if (this.username.length < 5 || this.username.length > 9) {
      alert('Invalid signup credentials');
      this.signupErrorMessage = 'Invalid signup credentials';
      return;
    }
  
    // Email format validation: must be username@mmc.com
    const emailPattern = new RegExp(`^${this.username}@mmc\\.com$`);
    if (!emailPattern.test(this.email)) {
      alert('Email must be in the format username@mmc.com');
      this.signupErrorMessage = 'Invalid signup credentials';
      return;
    }
  
    // Password complexity validation
    const hasLetter = /[a-zA-Z]/.test(this.password);
    const hasNumber = /\d/.test(this.password);
    if (!hasLetter || !hasNumber) {
      alert('Password must contain both letters and numbers');
      this.signupErrorMessage = 'Invalid signup credentials';
      return;
    }
  
    // Proceed with signup API call
    this.http.post<any>('http://localhost:5000/api/auth/signup', {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: (res) => {
        this.signupSuccessMessage = res.message || 'Signup successful!';
        const token = res.token;
        try {
          const decoded: any = jwtDecode(token);
          this.auth.setAuth(res.token, res.role, res.username);
          setTimeout(() => this.router.navigate(['/dashboard']), 700);
        } catch (e) {
          this.signupErrorMessage = 'Could not parse signup token';
        }
      },
      error: (err) => {
        alert('Invalid signup credentials');
        this.signupErrorMessage = err.error?.error || 'Signup failed. Please try again.';
      }
    });
  }
  
}