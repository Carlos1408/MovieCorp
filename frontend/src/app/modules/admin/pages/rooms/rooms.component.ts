import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { Cinema } from 'src/app/shared/interfaces/cinema';
import { Room } from 'src/app/shared/interfaces/room';
import { CinemaService } from 'src/app/shared/services/cinema.service';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  providers: [MessageService],
})
export class RoomsComponent implements OnInit {
  handleRoom: Room = {
    roomNum: '',
    nRows: 0,
    nCol: 0,
    price: 0,
  };

  rooms: Room[] = [];
  cinemas: Cinema[] = [];
  showForm: boolean = false;

  constructor(
    private roomService: RoomService,
    private cinemaService: CinemaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCinemas();
    this.getRooms();
  }

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  getRooms(): void {
    this.roomService
      .getAllRooms()
      .pipe(tap((rooms: Room[]) => (this.rooms = rooms)))
      .subscribe();
  }

  getCinemas(): void {
    this.cinemaService
      .getAllCinemas()
      .pipe(tap((cinemas: Cinema[]) => (this.cinemas = cinemas)))
      .subscribe();
  }

  createRoom(room: Room): void {
    this.roomService.createRoom(room).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sala nueva',
          detail: 'Datos ingresados correctamente',
        });
        this.getRooms();
      },
      error: (err) => console.log(err),
    });
  }

  deleteRoom(_id: string): void {
    this.roomService.deleteRoom(_id).subscribe({
      next: (res) => {
        this.getRooms();
      },
      error: (err) => console.log(err),
    });
  }

  updateRoom(room: Room): void {
    this.roomService.updateRoom(room).subscribe({
      next: (res) => {
        this.getRooms();
      },
      error: (err) => console.log(err),
    });
  }

  fillRoomForm(room: Room): void {
    this.roomService.fillRoomForm(room);
  }
}
