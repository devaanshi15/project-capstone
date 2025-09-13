// import { Component } from '@angular/core';
// import { Router, RouterLink, RouterModule } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { jwtDecode } from 'jwt-decode';
// import { AuthService } from '../services/auth.service';
// import { CommonModule, NgIf } from '@angular/common';

// @Component({
//   selector: 'app-signup',
//   standalone: true,
//   imports: [FormsModule, RouterLink, RouterModule, NgIf,CommonModule],
//   templateUrl: './signup.html',
//   styleUrls: ['./signup.css']
// })
// export class Signup {
//   username = '';
//   email = '';
//   password = '';
//   role = 'candidate';

//   signupSuccessMessage = '';
//   signupErrorMessage = '';

//   constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

//   signup() {
//   this.signupSuccessMessage = '';
//   this.signupErrorMessage = '';

//   // Username must contain at least one letter and one number
//   const usernameValid = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{4,9}$/.test(this.username);
//   if (!usernameValid) {
//     this.signupErrorMessage = 'Username must be 4-9 characters, letters or letters+numbers';
//     return;
//   }

//   // Email validation based on role
//   if (this.role === 'hr-admin') {
//     if (!/^[a-zA-Z0-9._%+-]+@mmc\.com$/.test(this.email)) {
//       this.signupErrorMessage = 'HR email must end with @mmc.com';
//       return;
//     }
//   } else if (this.role === 'candidate') {
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
//       this.signupErrorMessage = 'Invalid candidate email format';
//       return;
//     }
//   }

//   // Password must contain letter, number, special char
//   const passwordValid = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{5,9}$/.test(this.password);
//   if (!passwordValid) {
//     this.signupErrorMessage = 'Password must be 5-9 characters, include letters, numbers, and special characters';
//     return;
//   }

//   // Proceed with signup API
//   this.http.post<any>('http://localhost:5000/api/auth/signup', {
//     username: this.username,
//     email: this.email,
//     password: this.password,
//     role: this.role
//   }).subscribe({
//     next: (res) => {
//       this.signupSuccessMessage = res.message || 'Signup successful!';
//       const token = res.token;
//       try {
//         const decoded: any = jwtDecode(token);
//         // this.auth.setAuth(res.token, res.role, res.username);
//         this.auth.setAuth(res.token, res.role, res.username, res.email);

//         setTimeout(() => this.router.navigate(['/dashboard']), 700);
//       } catch (e) {
//         this.signupErrorMessage = 'Could not parse signup token';
//       }
//     },
//     error: (err) => {
//       this.signupErrorMessage = err.error?.error || 'Signup failed. Please try again.';
//     }
//   });
// }

  
// }



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
  imports: [FormsModule, RouterLink, RouterModule, NgIf, CommonModule],
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

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {}

  signup() {
    this.signupSuccessMessage = '';
    this.signupErrorMessage = '';

    this.http.post<any>('http://localhost:5000/api/auth/signup', {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: (res) => {
        const token = res.token;
        try {
          const decoded: any = jwtDecode(token);
          this.auth.setAuth(
            token,
            decoded.user.role,
            decoded.user.username,
            decoded.user.email
          );
          setTimeout(() => this.router.navigate(['/dashboard']), 700);
        } catch (e) {
          this.signupErrorMessage = 'Could not parse signup token';
        }
      },
      error: (err) => {
        this.signupErrorMessage = err.error?.error || 'Signup failed. Please try again.';
      }
    });
  }
}
