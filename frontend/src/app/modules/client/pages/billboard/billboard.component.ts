import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { ClientService } from 'src/app/core/services/client.service';
import { Cinema } from 'src/app/shared/interfaces/cinema';
import { Movie } from 'src/app/shared/interfaces/movie';
import { CinemaService } from 'src/app/shared/services/cinema.service';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-billboard',
  templateUrl: './billboard.component.html',
  styleUrls: ['./billboard.component.scss'],
})
export class BillboardComponent implements OnInit {
  cinema_id!: string;
  movies!: Movie[];
  cinema!: Cinema;

  constructor(
    private movieService: MovieService,
    private cinemaService: CinemaService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getCinemaId();
    this.getCinemaLg();
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

  getCinemaLg(): void {
    this.cinemaService
      .getCinemaLg(this.cinema_id)
      .pipe(
        tap((cinema: Cinema) => {
          this.cinema = cinema;
          if (cinema.movies) this.movies = cinema.movies;
        })
      )
      .subscribe();
  }

  getMovies(): void {
    this.movieService
      .getAllMovies()
      .pipe(tap((movies: Movie[]) => (this.movies = movies)))
      .subscribe();
  }
}
