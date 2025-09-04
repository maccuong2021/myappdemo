import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component'; // ✅ Use AppComponent
import { jwtInterceptor } from './app/modules/document/services/jwt.interceptor';
import 'zone.js';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptors([jwtInterceptor]))
  ]
});

