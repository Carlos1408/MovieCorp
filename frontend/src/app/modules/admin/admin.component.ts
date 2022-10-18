import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  options = [
    {
      title: 'Cines',
      url: '/admin/cinemas',
      imagePath: '/assets/images/admin/cinema.jpg'
    },
    {
      title: 'Salas',
      url: '/admin/rooms',
      imagePath: '/assets/images/admin/rooms.jpg'
    },
    {
      title: 'Peliculas',
      url: '/admin/movies',
      imagePath: '/assets/images/admin/movies.jpg'
    },
    {
      title: 'Crear Funcion',
      url: '/admin',
      imagePath: '/assets/images/admin/function.jpg'
    },
    {
      title: 'Mi perfil',
      url: '/admin',
      imagePath: '/assets/images/admin/profile.png'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
