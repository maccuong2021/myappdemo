import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../document/services/auth.service';
import { Router } from '@angular/router';
import { debug } from 'console';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',  
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = ''
  showPassword = false;
  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}
  onSubmit() {
    const loginData = {
      username: this.email,
      password: this.password
    };
    debugger;
    this.http.post<{ token: string }>(environment.authenUrl, loginData)
      .subscribe({
        next: (response) => {
          this.auth.setToken(response.token); // ✅ Save token
          this.router.navigate(['/list']);    // ✅ Redirect
        },
        error: (err) => {
          this.errorMessage = 'Login failed. Please check your credentials.';
          console.error('Login error:', err);
        }
      });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    
  }
  onInputChange() {
    this.errorMessage = '';
  }
}
