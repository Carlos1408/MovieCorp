import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ClientService } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  items!: MenuItem[];

  isLoggedIn!: boolean;
  private userRoleSubscription!: Subscription;

  isCinemaSelected!: boolean;
  cinemaSelectedSubscription!: Subscription;

  isMovieSelected!: boolean;
  movieSelectedSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.cinemaSelectedSubscription = this.clientService.isCinemaSelected$
      .pipe(
        tap((selected) => {
          if (!selected) {
            this.items = [
              {
                label: 'Cines',
                routerLink: '/client/theaters',
                styleClass: 'mx-1',
              },
            ];
          }
          if (selected) {
            this.items = [
              {
                label: 'Cines',
                routerLink: '/client/theaters',
                styleClass: 'mx-1',
              },
              {
                label: 'Cartelera',
                routerLink: `/client/billboard/${this.cookieService.get(
                  'cinema_id'
                )}`,
                styleClass: 'mx-1',
              },
            ];
          }
        })
      )
      .subscribe((selected) => {
        this.isCinemaSelected = selected;
      });

    this.movieSelectedSubscription = this.clientService.isMovieSelected$
      .pipe(
        tap((selected) => {
          if (selected) {
            this.items = [
              {
                label: 'Cines',
                routerLink: '/client/theaters',
                styleClass: 'mx-1',
              },
              {
                label: 'Cartelera',
                routerLink: `/client/billboard/${this.cookieService.get(
                  'cinema_id'
                )}`,
                styleClass: 'mx-1',
              },
              {
                label: 'Pelicula',
                styleClass: 'mx-1',
              },
            ];
          }
        })
      )
      .subscribe((selected) => {
        this.isMovieSelected = selected;
      });
    this.userRoleSubscription = this.authService.user$
      .pipe(
        tap((user) => {
          if (!user) {
            this.isLoggedIn = false;
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
    this.cinemaSelectedSubscription.unsubscribe();
    this.movieSelectedSubscription.unsubscribe();
  }

  redirectLogIn(): void {
    this.router.navigateByUrl('/auth/login');
  }

  logOut(): void {
    this.authService.logOut();
  }
}
