import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  items!: MenuItem[];

  isLoggedIn!: boolean;
  private userRoleSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userRoleSubscription = this.authService.user$
      .pipe(
        tap((user) => {
          if (!user) {
            this.isLoggedIn = false;
            this.items = [
              {
                label: 'Cines',
                routerLink: '/client/theaters',
                styleClass: 'mx-1',
              },
              {
                label: 'Cartelera',
                routerLink: '/client/billboard',
                styleClass: 'mx-1',
              },
              {
                label: 'Pelicula',
                routerLink: '/client/movie',
                styleClass: 'mx-1',
              },
            ];
          } else {
            this.isLoggedIn = true;
            if (user.role === 'admin') {
              this.items = [
                {
                  label: 'Administrador',
                  routerLink: '/admin',
                  styleClass: 'mx-1',
                  icon: 'pi pi-home text-white',
                },
                {
                  label: 'Cines',
                  routerLink: '/admin/cinemas',
                  styleClass: 'mx-1',
                  icon: 'pi pi-video text-white',
                },
                {
                  label: 'Salas',
                  routerLink: '/admin/rooms',
                  styleClass: 'mx-1',
                  icon: 'pi pi-tablet text-white',
                },
                {
                  label: 'Peliculas',
                  routerLink: '/admin/movies',
                  styleClass: 'mx-1',
                  icon: 'pi pi-ticket text-white',
                },
                {
                  label: 'Funciones',
                  routerLink: '/admin/functions',
                  styleClass: 'mx-1',
                  icon: 'pi pi-video text-white',
                },
                {
                  label: 'Mi perfil',
                  routerLink: '/profile',
                  styleClass: 'mx-1',
                  icon: 'pi pi-user text-white',
                },
              ];
            }
            if (user.role === 'manager') {
              this.items = [
                {
                  label: 'Gerente',
                  routerLink: '/management',
                  styleClass: 'mx-1',
                  icon: 'pi pi-home text-white',
                },
                {
                  label: 'Usuarios',
                  routerLink: '/management/users',
                  styleClass: 'mx-1',
                  icon: 'pi pi-users text-white',
                },
                {
                  label: 'Mi perfil',
                  routerLink: '/profile',
                  styleClass: 'mx-1',
                  icon: 'pi pi-user text-white',
                },
              ];
            }
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.userRoleSubscription.unsubscribe();
  }

  redirectLogIn(): void {
    this.router.navigateByUrl('/auth/login');
  }

  logOut(): void {
    this.authService.logOut();
  }
}
