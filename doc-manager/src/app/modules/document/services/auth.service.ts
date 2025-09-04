import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // 🔐 Save token and extract user info
  setToken(token: string): void {
    if (!this.isBrowser) return;

    localStorage.setItem('token', token);

    const decoded = this.decodeJwt(token);
    if (decoded) {
      const nameClaim = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
      const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

      if (decoded[nameClaim]) {
        localStorage.setItem('loginName', decoded[nameClaim]);
      }

      if (decoded[roleClaim]) {
        localStorage.setItem('userRole', decoded[roleClaim]);
      }
    }
  }

  // 🧼 Clear token and user info
  clearToken(): void {
    if (!this.isBrowser) return;

    localStorage.removeItem('token');
    localStorage.removeItem('loginName');
    localStorage.removeItem('userRole');
  }


  // ✅ Check if user is logged in
  isLoggedIn(): boolean {
    return this.isBrowser && !!localStorage.getItem('token');
  }

  // 👤 Get user info from token
  getUser(): { name: string; role: string } | null {
    if (!this.isBrowser) return null;

    const token = localStorage.getItem('token');
    if (!token) return null;

    const decoded = this.decodeJwt(token);
    if (decoded) {
      return {
        name: decoded.name || '',
        role: decoded.role || ''
      };
    }

    return null;
  }

  // 🧠 Decode JWT payload
  private decodeJwt(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Invalid JWT token:', error);
      return null;
    }
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem('token');
  }

  // 👤 Get login name directly
  getLoginName(): string {
    if (!this.isBrowser) return 'Guest';
    return localStorage.getItem('loginName') || 'Guest';
  }
}
