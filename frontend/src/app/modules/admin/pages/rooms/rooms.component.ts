import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Room } from 'src/app/shared/interfaces/room';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.getRooms();
  }
  getRooms(): void {
    this.roomService
    .getAllRooms()
    .pipe(tap((rooms: Room[]) => (this.rooms = rooms)))
    .subscribe();
  }
  createRooms(room: Room): void {
    this.roomService.createRoom(room).subscribe({
      next: (res) => {
        this.getRooms();
      },
      error: (err) => console.log(err),
    });
  }

  deleteRoom(_id: string): void{
    this.roomService.deleteRoom(_id).subscribe({
      next: (res) => {
        this.getRooms();
      },
      error: (err) => console.log(err),
    })
  }

  updateRoom(room: Room): void{
    this.roomService.updateRoom(room).subscribe({
      next: (res) => {
        this.getRooms();
      },
      error: (err) => console.log(err),
    });
  }

  fillRoomForm(room: Room): void{
    this.roomService.fillRoomForm(room);
  }
}
