import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { Cinema } from 'src/app/shared/interfaces/cinema';
import { Room } from 'src/app/shared/interfaces/room';
import { CinemaService } from 'src/app/shared/services/cinema.service';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class RoomsComponent implements OnInit {
  handleRoom: Room = {
    roomNum: '',
    nRows: 0,
    nCol: 0,
    price: 0,
    timeRanges: []
  };

  rooms: Room[] = [];
  cinemas: Cinema[] = [];
  showForm: boolean = false;

  constructor(
    private roomService: RoomService,
    private cinemaService: CinemaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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
    this.handleRoom = {
      roomNum: '',
      nRows: 0,
      nCol: 0,
      price: 0,
      timeRanges: []
    };
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

  confirmDelete(_id: string) {
    this.confirmationService.confirm({
      header: 'Eliminar Sala',
      message: 'Esta seguro que quiere eliminar la sala?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteRoom(_id);
      },
    });
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
        this.messageService.add({
          severity: 'success',
          summary: 'Sala eliminada',
          detail: 'La sala ha sido eliminada correctamente',
        });
        this.getRooms();
      },
      error: (err) => console.log(err),
    });
  }

  updateRoom(room: Room): void {
    this.roomService.updateRoom(room).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Datos de sala actualizado',
          detail: 'Los datos de la sala han sido actualizados',
        });
        this.getRooms();
      },
      error: (err) => console.log(err),
    });
  }

  fillRoomForm(room: Room): void {
    this.handleRoom = room;
    this.openForm();
  }
}
