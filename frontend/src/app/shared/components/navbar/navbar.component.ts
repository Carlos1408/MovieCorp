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
        label: 'Cartelera',
        routerLink: '/client/billboard',
        styleClass: 'mx-1',
      },
      {
        label: 'Administrador',
        routerLink: '/admin',
        styleClass: 'mx-1',
        
      },
      {
        label: 'Gerente',
        routerLink: '/management',
        styleClass: 'mx-1',
        
      },
      {
        label: 'Cines',
        routerLink: '/admin/cinemas',
        styleClass: 'mx-1',
        icon: 'pi pi-video',
        
      },
      {
        label: 'Salas',
        routerLink: '/admin/rooms',
        styleClass: 'mx-1',
        icon: 'pi pi-tablet'
      },
      {
        label: 'Peliculas',
        routerLink: '/admin/movies',
        styleClass: 'mx-1',
        icon: 'pi pi-ticket'
      },
      {
        label: 'Funciones',
        routerLink: '/admin/functions',
        styleClass: 'mx-1',
      },
      {
        label: 'Usuarios',
        routerLink: '/management/users',
        styleClass: 'mx-1',
        icon: 'pi pi-users'
      },
      {
        label: 'Mi perfil',
        routerLink: '/admin/profile',
        styleClass: 'mx-1',
      },
    ];
  }
}
