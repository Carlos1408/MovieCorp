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
  public get editMode(): boolean {
    const editMode = this.functionForm.get('_id')?.value ? true : false;
    if (editMode) this.functionForm.disable();
    if (!editMode) this.functionForm.enable();

    return this.functionForm.get('_id')?.value;
  }

  cinemas: Cinema[] = [];
  rooms: Room[] | any = [];
  movies: Movie[] | any = [];

  selectedMovie!: Movie | any;
  selectedRoom!: Room | any;

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
  }

  onShow(): void {
    this.fillfunctionForm();
  }

  closeDialog(): void {
    this.closeForm.emit();
    this.selectedMovie = {};
    this.functionForm.reset();
  }

  getCinemas(): void {
    this.cinemaService
      .getAllCinemas()
      .pipe(tap((cinemas: Cinema[]) => (this.cinemas = cinemas)))
      .subscribe();
  }

  fillfunctionForm() {
    this.functionForm.get('_id')?.setValue(this.handledFunction._id);
    this.functionForm
      .get('cinema_id')
      ?.setValue(this.handledFunction.cinema_id);
    this.onSelectCinema();
    this.functionForm.get('room_id')?.setValue(this.handledFunction.room_id);
    this.functionForm.get('room_id')?.setValue(this.handledFunction.room_id);
    this.functionForm.get('movie_id')?.setValue(this.handledFunction.movie_id);
    this.functionForm
      .get('from')
      ?.setValue(this.editMode ? new Date(this.handledFunction.from) : '');
    this.functionForm
      .get('to')
      ?.setValue(this.editMode ? new Date(this.handledFunction.from) : '');
  }

  onSelectCinema(): void {
    const cinema_id = this.functionForm.get('cinema_id')?.value;
    if (cinema_id) {
      this.cinemaService
        .getCinemaLg(cinema_id)
        .pipe(
          tap((cinema: Cinema) => {
            this.rooms = cinema.rooms;
            this.movies = cinema.movies;
          })
        )
        .subscribe();
    }
  }

  onSelectRoom(id: any): void {
    this.selectedRoom = this.rooms.filter((r: Room) => {
      return r._id === id.value;
    })[0];
  }

  onSelectMovie(id: any): void {
    this.selectedMovie = this.movies.filter((m: Movie) => {
      return m._id === id.value;
    })[0];
  }

  onSelectFrom(time: any): void {
    const to: Date = new Date(time);
    to.setMinutes(time.getMinutes() + (this.selectedMovie.length + 30));
    this.functionForm.get('to')?.setValue(to);
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
