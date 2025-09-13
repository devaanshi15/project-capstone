import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  role: string | null = null;
  username: string | null = null;
  email: string | null = null;
  dropdownOpen: boolean = false;

  constructor(private router: Router, private auth: AuthService) {
    this.role = this.auth.getRole();
    this.username = this.auth.getUsername();
    this.email = this.auth.getEmail();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleDarkMode(event: any) {
    if (event.target.checked) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  logout() {
    this.auth.clearAuth();
    this.router.navigate(['/login']);
  }
}
