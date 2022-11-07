import { Component, OnInit } from '@angular/core';
import { Option } from 'src/app/core/interfaces/option';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  options: Option[] = [
    {
      name: 'Cines',
      url: '/admin/cinemas',
      imagePath: '/assets/images/admin/cinema.jpg'
    },
    {
      name: 'Salas',
      url: '/admin/rooms',
      imagePath: '/assets/images/admin/rooms.jpg'
    },
    {
      name: 'Peliculas',
      url: '/admin/movies',
      imagePath: '/assets/images/admin/movies.jpg'
    },
    {
      name: 'Funciones',
      url: '/admin/functions',
      imagePath: '/assets/images/admin/function.jpg'
    },
    {
      name: 'Mi perfil',
      url: '/profile',
      imagePath: '/assets/images/admin/profile.png'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
