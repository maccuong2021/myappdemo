import { Routes } from '@angular/router';
import { DocumentListComponent } from './modules/document/components/document-list/document-list.component';
import { DocumentFormComponent } from './modules/document/components/document-form/document-form.component';
import { DocumentDetailComponent } from './modules/document/components/document-detail/document-detail.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './modules/document/services/auth.guard';
import { MainLayoutComponent } from './main-layout.component';
import { AuthLayoutComponent } from './auth-layout.component';

// export const APP_ROUTES: Routes = [
//   { path: '', redirectTo: 'list', pathMatch: 'full' }, // ✅ Default route goes to login
//   { path: 'login', component: LoginComponent },
//   { path: 'list', component: DocumentListComponent, canActivate: [AuthGuard] },
//   { path: 'add', component: DocumentFormComponent, canActivate: [AuthGuard] },
//   { path: 'detail/:id', component: DocumentDetailComponent, canActivate: [AuthGuard] },
//   { path: '**', redirectTo: 'login' } // ✅ Catch-all fallback
// ];

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DocumentListComponent, canActivate: [AuthGuard] },
      { path: 'list', component: DocumentListComponent, canActivate: [AuthGuard] },
      { path: 'add', component: DocumentFormComponent, canActivate: [AuthGuard] }, // ✅ Added route
      { path: 'detail/:id', component: DocumentDetailComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }
      // { path: 'register', component: RegisterComponent } // Optional
    ]
  },
  { path: '**', redirectTo: 'list' } // ✅ Catch-all fallback
];
