import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { ClientService } from 'src/app/core/services/client.service';
import { Function } from 'src/app/shared/interfaces/function';
import { Movie } from 'src/app/shared/interfaces/movie';
import { MovieService } from 'src/app/shared/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  BASE_URL = `${environment.API_BASE_URL}/`;
  movie!: Movie;
  functions!: Function[];

  trailerUrl!: string;

  constructor(
    private movieService: MovieService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const movie_id = this.route.snapshot.paramMap.get('id');
    if (movie_id) this.getMovieLg(movie_id);
  }

  getMovieLg(id: string): void {
    this.movieService
      .getMovieLg(id)
      .pipe(tap((movie) => (this.movie = movie)))
      .subscribe((movie) => {
        const urlArr = movie.trailer.split('/');
        this.trailerUrl = urlArr[urlArr.length - 1];
        if (this.movie.functions) {
          this.functions = this.movie.functions?.filter((f: Function) => {
            return f.cinema_id === this.clientService.cinema_id;
          });
        }
      });
  }

  handleClick(function_: Function): void {
    this.clientService.setRoom(function_.room_id);
    if (function_._id) {
      this.clientService.setFunction(function_._id);
      this.router.navigateByUrl(`/client/room-function/${function_._id}`);
    }
  }

  getAvailableSeats = (function_: Function | undefined): string => {
    if (function_)
      return `${(
        Number(function_.nSeats) - Number(function_.occupiedSeats?.length)
      ).toString()} entradas disponibles`;
    else return '';
  };
}
