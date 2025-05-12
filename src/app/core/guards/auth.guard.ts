import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean {
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      const rolesFromToken =
        decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      const routeRoles = route.data['roles'] as string[] | undefined;

      // Si hay roles requeridos, verifica que al menos uno coincida
      if (routeRoles && routeRoles.length > 0) {
        const roles = Array.isArray(rolesFromToken)
          ? rolesFromToken
          : [rolesFromToken];

        const hasAccess = routeRoles.some((r) => roles.includes(r));

        if (!hasAccess) {
          this.router.navigate(['/login']);
          return false;
        }
      }

      return true;
    } catch {
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
