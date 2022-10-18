import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Function } from 'src/app/shared/interfaces/function';
import { MessageService } from 'primeng/api';

import { CinemaService } from 'src/app/shared/services/cinema.service';
import { MovieService } from 'src/app/shared/services/movie.service';
import { RoomService } from 'src/app/shared/services/room.service';

import { Cinema } from 'src/app/shared/interfaces/cinema';
import { Movie } from 'src/app/shared/interfaces/movie';
import { Room } from 'src/app/shared/interfaces/room';
import { tap } from 'rxjs';

@Component({
  selector: 'app-function-form',
  templateUrl: './function-form.component.html',
  styleUrls: ['./function-form.component.scss'],
})
export class FunctionFormComponent implements OnInit {
  cinemas: Cinema[] = [];
  roomsRaw: Room[] = [];
  moviesRaw: Movie[] = [];

  rooms: Room[] = [];
  movies: Movie[] = [];

  @Input() showForm!: boolean;

  @Output() closeForm = new EventEmitter();
  @Input() handledFunction!: Function;

  @Output() createFunction = new EventEmitter<Function>();

  functionForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    cinema_id: new FormControl('', Validators.required),
    room_id: new FormControl('', Validators.required),
    movie_id: new FormControl('', Validators.required),
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
  });

  constructor(
    private cinemaService: CinemaService,
    private roomService: RoomService,
    private movieService: MovieService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCinemas();
    this.getRooms();
    this.getMovies();
  }

  onShow(): void {}

  getCinemas(): void {
    this.cinemaService
      .getAllCinemas()
      .pipe(tap((cinemas: Cinema[]) => (this.cinemas = cinemas)))
      .subscribe();
  }

  getRooms(): void {
    this.roomService
      .getAllRooms()
      .pipe(tap((rooms: Room[]) => (this.roomsRaw = rooms)))
      .subscribe();
  }

  getMovies(): void {
    this.movieService
      .getAllMovies()
      .pipe(tap((movies: Movie[]) => (this.moviesRaw = movies)))
      .subscribe();
  }

  closeDialog(): void {
    this.functionForm.reset();
    this.closeForm.emit();
  }

  fillfunctionForm() {
    this.functionForm.get('_id')?.setValue(this.handledFunction._id);
    this.functionForm
      .get('cinema_id')
      ?.setValue(this.handledFunction.cinema_id);
    this.functionForm.get('room_id')?.setValue(this.handledFunction.room_id);
    this.functionForm.get('movie_id')?.setValue(this.handledFunction.movie_id);
    this.functionForm.get('from')?.setValue(this.handledFunction.from);
    this.functionForm.get('to')?.setValue(this.handledFunction.to);
  }

  onSelectedCinema() {
    const cinema_id = this.functionForm.get('cinema_id')?.value;
    this.getRooms();
    this.getMovies();
    const cinema = this.cinemas.filter((c) => {
      return c._id === cinema_id;
    })[0];
  }

  handleSubmit() {
    if (this.functionForm.valid) {
      this.createFunction.emit(this.functionForm.value);
      this.closeDialog();
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario invalido',
        detail: 'Todos los datos deben ser llenados correctamente',
      });
    }
  }
}
