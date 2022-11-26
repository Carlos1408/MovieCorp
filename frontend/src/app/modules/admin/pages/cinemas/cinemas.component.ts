import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { Cinema } from 'src/app/shared/interfaces/cinema';
import { Movie } from 'src/app/shared/interfaces/movie';
import { CinemaService } from 'src/app/shared/services/cinema.service';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss'],
  providers: [],
})
export class CinemasComponent implements OnInit {
  handleCinema: Cinema = {
    name: '',
    address: '',
    imagePath: '',
    movies_ids: [],
  };

  cinemas: Cinema[] = [];
  movies: Movie[] = [];
  showForm: boolean = false;

  constructor(
    private cinemaService: CinemaService,
    private movieService: MovieService,
    private messageSerice: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getCinemas();
    this.getMovies();
  }

  openForm(): void {
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.handleCinema = {
      name: '',
      address: '',
      imagePath: '',
      movies_ids: [],
    };
  }

  confirmDelete(_id: string) {
    this.confirmationService.confirm({
      message: 'Esta seguro que quiere eliminar el cine?',
      header: 'Eliminar usuario',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteCinema(_id);
      },
    });
  }

  getCinemas(): void {
    this.cinemaService
      .getAllCinemas()
      .pipe(tap((cinemas: Cinema[]) => (this.cinemas = cinemas)))
      .subscribe();
  }

  getMovies(): void {
    this.movieService
      .getAllMovies()
      .pipe(tap((movies: Movie[]) => (this.movies = movies)))
      .subscribe();
  }

  createCinema(cinema: Cinema): void {
    this.cinemaService.createCinema(cinema).subscribe({
      next: (res) => {
        this.messageSerice.add({
          severity: 'success',
          summary: 'Nuevo Cine',
          detail: 'Datos agregados correctamente',
        });
        this.getCinemas();
      },
      error: (err) => console.log(err),
    });
  }

  deleteCinema(_id: string): void {
    this.cinemaService.deleteCinema(_id).subscribe({
      next: (res) => {
        this.messageSerice.add({
          severity: 'success',
          summary: 'Elminar cine',
          detail: 'Los datos del cine han sido elminados correctamente',
        });
        if (res.rooms_ids) {
          this.messageSerice.add({
            severity: 'warn',
            summary: `${res.rooms_ids.length} salas eliminadas`,
            detail: `Los datos de ${res.rooms_ids.length} salas han sido elminados`,
          });
        }
        this.getCinemas();
      },
      error: (err) => console.log(err),
    });
  }

  updateCinema(cinema: Cinema): void {
    this.cinemaService.updateCinema(cinema).subscribe({
      next: (res) => {
        this.messageSerice.add({
          severity: 'success',
          summary: 'Datos actualizados',
          detail: 'Los datos del cine han sido actualizados exitosamente',
        });
        this.getCinemas();
      },
      error: (err) => console.log(err),
    });
  }

  updateCinemaNoImg(cinema: Cinema): void {
    this.cinemaService.updateCinemaNoImg(cinema).subscribe({
      next: (res) => {
        this.messageSerice.add({
          severity: 'success',
          summary: 'Datos actualizados',
          detail: 'Los datos del cine han sido actualizados exitosamente',
        });
        this.getCinemas();
      },
      error: (err) => console.log(err),
    });
  }

  fillCinemaForm(cinema: Cinema): void {
    this.handleCinema = cinema;
    this.openForm();
  }
}
