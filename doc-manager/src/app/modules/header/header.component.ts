import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../document/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loginName = '';

  constructor(private auth: AuthService, private router: Router) {
    this.loginName = this.auth.getLoginName(); // You must implement this method
  }

  logout() {
    this.auth.clearToken(); // Clear token or session
    this.router.navigate(['/login']);
  }
}
