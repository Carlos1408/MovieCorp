import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { ClientService } from 'src/app/core/services/client.service';
import { Function } from 'src/app/shared/interfaces/function';
import { Movie } from 'src/app/shared/interfaces/movie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-billboard',
  templateUrl: './billboard.component.html',
  styleUrls: ['./billboard.component.scss'],
})
export class BillboardComponent implements OnInit {
  cinema_id!: string;
  movies!: Movie[];
  functions!: Function[];

  constructor(
    private movieService: MovieService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCinemaId();
    this.getCinemaMovies();
  }

  getMovieFunctions(movie_id?: string): Function[] {
    if (this.functions) {
      return this.functions.filter((f) => {
        console.log('FUNCTIONS ');
        console.log(f);
        f.movie_id == movie_id;
      });
    } else return [];
  }

  selectMovie(movie_id: string): void {
    this.clientService.setMovie(movie_id);
    this.router.navigateByUrl(`/client/movie/${movie_id}`);
  }

  getCinemaId(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const cinema_id = paramMap.get('cinema_id');
      if (cinema_id) {
        this.clientService.setCinema(cinema_id);
        this.cinema_id = cinema_id;
      }
    });
  }

  getCinemaMovies(): void {
    this.movieService
      .getCinemaMoviesLg(this.cinema_id)
      .pipe(tap((movies: Movie[]) => (this.movies = movies)))
      .subscribe();
  }
}
