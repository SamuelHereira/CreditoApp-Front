import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [AuthGuard],
    data: { roles: ['Applicant'] },
  },
  {
    path: 'new-request',
    loadComponent: () =>
      import('./pages/new-request/new-request.component').then(
        (m) => m.NewRequestComponent
      ),
    canActivate: [AuthGuard],
    data: { roles: ['Applicant'] },
  },
  {
    path: 'review-requests',
    loadComponent: () =>
      import('./pages/review-requests/review-requests.component').then(
        (m) => m.ReviewRequestsComponent
      ),
    canActivate: [AuthGuard],
    data: { roles: ['Analyst'] },
  },
  {
    path: 'review-requests/:id',
    loadComponent: () =>
      import('./pages/request-details/request-details.component').then(
        (m) => m.RequestDetailsComponent
      ),
    canActivate: [AuthGuard],
    data: { roles: ['Analyst'] },
  },

  { path: '**', redirectTo: 'login' },
];
