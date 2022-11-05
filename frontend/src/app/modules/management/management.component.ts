import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  options = [
    {
      name: 'Reportes',
      url: '/reports',
      imagePath: '/assets/images/management/reports.jpg'
    },
    {
      name: 'Administracion de usuarios',
      url: '/management/users',
      imagePath: '/assets/images/management/users.jpg'
    },
    {
      name: 'Mi perfil',
      url: '/profile',
      imagePath: '/assets/images/management/profile.png'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
