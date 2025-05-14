import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isOpen: boolean = false;
  roles: string[];
  route: string = '';

  constructor(private authService: AuthService, private router: Router) {
    const userData = this.authService.getUserData();
    this.roles = userData?.roles || [];
    this.route = this.router.url;
  }

  // Add any methods or properties needed for the navbar component
  onLogout(): void {
    console.log('Logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onProfile(): void {
    this.isOpen = !this.isOpen;
  }
}
