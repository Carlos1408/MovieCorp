import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

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
      url: '/profile',
      imagePath: '/assets/images/management/profile.png'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
