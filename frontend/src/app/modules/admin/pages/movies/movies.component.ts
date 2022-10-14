import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Movie } from 'src/app/shared/interfaces/movie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies!: Movie[];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
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
        console.log(res);
        this.getMovies();
      },
      error: (err) => console.log(err),
    });
  }
}
