import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { MessageService } from 'primeng/api';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserRoleGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.verifyRole(route);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.verifyRole(route);
  }

  private verifyRole(route: Route | ActivatedRouteSnapshot) {
    const allowedRole: string = route.data?.['allowedRole'];
    return this.authService.user$.pipe(
      map((user) => {
        if (!user) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Acceso denegado',
            detail: 'Debe iniciar sesion en el sistema',
          });
          return this.router.createUrlTree(['/auth/login']);
        }
        if (user.role !== allowedRole) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Acceso denegado',
            detail: 'Rol de usuario no permitido',
          });
          return this.router.createUrlTree([
            this.authService.getRoleHomeUrl(user.role),
          ]);
        }
        return true;
      })
    );
  }
}
