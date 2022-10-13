import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/shared/interfaces/room';

@Component({
  selector: 'app-room-table',
  templateUrl: './room-table.component.html',
  styleUrls: ['./room-table.component.scss']
})
export class RoomTableComponent implements OnInit {
  @Input() rooms!: Room[];

  constructor() { }

  ngOnInit(): void {
  }

}
