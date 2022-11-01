import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { Movie } from 'src/app/shared/interfaces/movie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class MoviesComponent implements OnInit {
  handledMovie: Movie = {
    title: '',
    synopsis: '',
    genre: '',
    rating: '',
    length: 0,
    protagonists: '',
    director: '',
    imagePath: '',
    trailer: '',
  };

  movies!: Movie[];
  showForm: boolean = false;

  constructor(
    private movieService: MovieService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  openForm(): void {
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.handledMovie = {
      title: '',
      synopsis: '',
      genre: '',
      rating: '',
      length: 0,
      protagonists: '',
      director: '',
      imagePath: '',
      trailer: '',
    };
  }

  confirmDelete(_id: string): void {
    this.confirmationService.confirm({
      message: 'Esta seguro que quiere eliminar la pelicula?',
      header: 'Eliminar pelicula',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteMovie(_id);
      },
    });
  }

  getMovies(): void {
    this.movieService
      .getAllMovies()
      .pipe(tap((movies: Movie[]) => (this.movies = movies)))
      .subscribe();
  }

  createMovie(movie: any): void {
    this.movieService.createMovie(movie).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Pelicula nueva',
          detail: 'La pelicula ha sido creada exitosamente',
        });
        this.getMovies();
      },
      error: (err) => console.log(err),
    });
  }

  updateMovie(movie: Movie): void {
    this.movieService.updateMovie(movie).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Pelicula actualizada',
          detail: 'La pelicula ha sido actualizada exitosamente',
        });
        this.getMovies();
      },
      error: (err) => console.log(err),
    });
  }

  deleteMovie(_id: string): void {
    this.movieService.deleteMovie(_id).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Pelicula eliminada',
          detail: 'La pelicula ha sido eliminada exitosamente',
        });
        this.getMovies();
      },
      error: (err) => console.log(err),
    });
  }

  fillMovieForm(movie: Movie): void {
    this.handledMovie = movie;
    this.openForm();
  }
}
