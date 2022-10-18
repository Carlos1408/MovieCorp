import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  options = [
    {
      title: 'Reportes',
      url: '/reports',
      imagePath: '/assets/images/management/reports.jpg'
    },
    {
      title: 'Administracion de usuarios',
      url: '/management/users',
      imagePath: '/assets/images/management/users.jpg'
    },
    {
      title: 'Mi perfil',
      url: '/management/profile',
      imagePath: '/assets/images/management/profile.png'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
