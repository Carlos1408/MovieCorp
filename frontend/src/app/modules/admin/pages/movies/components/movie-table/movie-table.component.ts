import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/shared/interfaces/movie';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.scss'],
})
export class MovieTableComponent implements OnInit {
  @Input() movies!: Movie[];

  @Output() deleteMovie = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  handleDelete(_id?: string) {
    console.log(_id);
    if (confirm('Seguro que quiere eliminar la pelicula?')) {
      this.deleteMovie.emit(_id);
    }
  }
}
