import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  items!: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Cines',
        routerLink: '/admin/cinemas',
        styleClass: 'mx-1'
      },
      {
        label: 'Salas',
        routerLink: '/admin/rooms',
        styleClass: 'mx-1'
      },
      {
        label: 'Peliculas',
        routerLink: '/admin/movies',
        styleClass: 'mx-1'
      },
      {
        label: 'Usuarios',
        routerLink: '/management/users',
        styleClass: 'mx-1'
      },
    ];
  }
}
