import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Movie } from 'src/app/shared/interfaces/movie';
import { MovieService } from 'src/app/shared/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  functions = ['10:30', '13:30', '16:00', '18:30', '17:00', '18:00']; // ELIMINAR

  BASE_URL = `${environment.API_BASE_URL}/`;

  movie_id = '634f78f0374a800c6b355b1c';

  movie!: Movie;

  trailerUrl!: string;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const movie_id = this.route.snapshot.paramMap.get('id');
    if (movie_id) this.getMovie(movie_id);
  }

  getMovie(id: string): void {
    this.movieService
      .getMovieLg(id)
      .pipe(tap((movie) => (this.movie = movie)))
      .subscribe((movie) => {
        this.trailerUrl = movie.trailer.split('=')[1].split('&')[0];
      });
  }

  handleClick(function_id: any): void {
    console.log('redirect to function page');
  }
}
