import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Room } from 'src/app/shared/interfaces/room';

@Component({
  selector: 'app-room-table',
  templateUrl: './room-table.component.html',
  styleUrls: ['./room-table.component.scss']
})
export class RoomTableComponent implements OnInit {
  @Input() rooms!: Room[];
  @Output() deleteRoom = new EventEmitter<string>();
  @Output() editRoom = new EventEmitter<Room>();

  constructor() { }

  ngOnInit(): void {
  }

  handleDelete(_id?: string): void{
    this.deleteRoom.emit(_id);
  }
  handleEdit(room: Room){
    this.editRoom.emit(room);
  }
}
