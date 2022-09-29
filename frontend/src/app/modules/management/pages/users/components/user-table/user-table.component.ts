import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  users = [
    {
      name: 'Carlos',
      lastnames: 'Claure Vargas',
      phone: '70573030',
      email: 'carlos@gmail.com'
    },
    {
      name: 'Victor',
      lastnames: 'Camacho Paco',
      phone: '1234567',
      email: 'victor@gmail.com'
    },
    {
      name: 'Raquel',
      lastnames: 'Calle Zapata',
      phone: '1234567',
      email: 'raquel@gmail.com'
    },
    {
      name: 'Sebastian',
      lastnames: 'Alvarez Bustillos',
      phone: '1234567',
      email: 'sebas@gmail.com'
    },
    {
      name: 'Adilson',
      lastnames: 'Heredia',
      phone: '1234567',
      email: 'adilson@gmail.com'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
