import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile = {
    name: 'Juan Pablo',
    lastnames: 'Perez Velarde',
    phone: 78459265,
    email: 'juanperez@gmail.com'
  }

  constructor() { }
  ngOnInit(): void {
  }

}
