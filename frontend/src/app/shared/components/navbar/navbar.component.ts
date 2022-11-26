import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription, tap } from 'rxjs';
import { Ticket } from 'src/app/core/interfaces/ticket';
import { AuthService } from 'src/app/core/services/auth.service';
import { ClientService } from 'src/app/core/services/client.service';
import { loggedItems } from './loggedItems';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  items!: MenuItem[];

  isLoggedIn!: boolean;
  private userRoleSubscription!: Subscription;

  ticket!: Ticket;
  ticketSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.ticketSubscription = this.clientService.ticket$.pipe().subscribe({
      next: (ticket) => {
        this.items = [
          {
            label: 'Cines',
            routerLink: '/client/theaters',
            styleClass: 'mx-1',
          },
        ];
        if (ticket.cinema_id) {
          this.items = [
            ...this.items,
            {
              label: 'Cartelera',
              routerLink: `/client/billboard/${ticket.cinema_id}`,
              styleClass: 'mx-1',
            },
          ];
        }
        if (ticket.movie_id) {
          this.items = [
            ...this.items,
            {
              label: 'Película',
              routerLink: `/client/movie/${ticket.movie_id}`,
              styleClass: 'mx-1',
            },
          ];
        }
      },
    });

    this.userRoleSubscription = this.authService.user$
      .pipe(
        tap((user) => {
          if (!user) {
            this.isLoggedIn = false;
          } else {
            this.isLoggedIn = true;
            if (user.role === 'admin') {
              this.items = loggedItems.admin;
            }
            if (user.role === 'manager') {
              this.items = loggedItems.manager;
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
