import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ClientService } from 'src/app/core/services/client.service';
import { Function } from 'src/app/shared/interfaces/function';
import { Movie } from 'src/app/shared/interfaces/movie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: Movie;
  @Output() selectMovie = new EventEmitter<string>();

  functions!: Function[];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    if (this.movie.functions) {
      this.functions = this.movie.functions?.filter(
        (f: Function) => f.cinema_id === this.clientService.cinema_id
      );
    }
  }

  URL_API = `${environment.API_BASE_URL}/`;

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  handleSelect(): void {
    this.selectMovie.emit(this.movie._id);
  }
}
