import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-table',
  templateUrl: './room-table.component.html',
  styleUrls: ['./room-table.component.scss']
})
export class RoomTableComponent implements OnInit {
  rooms=[{
    nRows: 9,
    nCol: 7,
    price: 30,
    roomNum: 1
  },{
    nRows: 9,
    nCol: 7,
    price: 30,
    roomNum: 1
  },{
    nRows: 9,
    nCol: 7,
    price: 30,
    roomNum: 1
  },{
    nRows: 9,
    nCol: 7,
    price: 30,
    roomNum: 1
  },{
    nRows: 9,
    nCol: 7,
    price: 30,
    roomNum: 1
  },{
    nRows: 9,
    nCol: 7,
    price: 30,
    roomNum: 1
  }]
  constructor() { }

  ngOnInit(): void {
  }

}
