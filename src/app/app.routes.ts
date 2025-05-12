import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

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
    // canActivate: [AuthGuard],
    data: { roles: ['Applicant'] },
  },
  //   { path: 'review', loadComponent: () => import('./pages/analyst-review/review.component').then(m => m.ReviewComponent), canActivate: [AuthGuard], data: { roles: ['Analyst'] } },
  { path: '**', redirectTo: 'login' },
];
