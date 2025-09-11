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

  constructor(private router: Router, private auth: AuthService) {
    this.role = this.auth.getRole();
  }

  logout() {
    this.auth.clearAuth();
    this.router.navigate(['/login']);
  }
}
