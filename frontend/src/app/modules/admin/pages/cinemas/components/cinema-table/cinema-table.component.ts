import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cinema-table',
  templateUrl: './cinema-table.component.html',
  styleUrls: ['./cinema-table.component.scss']
})
export class CinemaTableComponent implements OnInit {

  cinemas = [{
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
  },]

  constructor() { }

  ngOnInit(): void {
  }

}
