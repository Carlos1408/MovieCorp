import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/shared/interfaces/movie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.scss'],
})
export class MovieTableComponent implements OnInit {

  @Input() movies!: Movie[];

  @Output() editMovie = new EventEmitter<Movie>();
  @Output() deleteMovie = new EventEmitter<string>();

  constructor() {}
  URL_API = `${environment.API_BASE_URL}/`;

  ngOnInit(): void {}

  handleEdit(movie: Movie) {
    this.editMovie.emit(movie);
  }

  handleDelete(_id?: string) {
    this.deleteMovie.emit(_id);
  }
}
