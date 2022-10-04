import { Component, Input, OnInit } from '@angular/core';
import { Cinema } from 'src/app/shared/interfaces/cinema';

@Component({
  selector: 'app-cinema-table',
  templateUrl: './cinema-table.component.html',
  styleUrls: ['./cinema-table.component.scss']
})
export class CinemaTableComponent implements OnInit {
   @Input() cinemas!: Cinema[];

  /*cinemas = [{
    name: "Cochabamba",
    address: "Cochabamba",
    nRooms: 4,
    nMovies: 15
  },{
    name: "Cochabamba",
    address: "Cochabamba",
    nRooms: 4,
    nMovies: 15
  },{
    name: "Cochabamba",
    address: "Cochabamba",
    nRooms: 4,
    nMovies: 15
  },{
    name: "Cochabamba",
    address: "Cochabamba",
    nRooms: 4,
    nMovies: 15
  },{
    name: "Cochabamba",
    address: "Cochabamba",
    nRooms: 4,
    nMovies: 15
  },]*/

  constructor() { }

  ngOnInit(): void {
  }

}
