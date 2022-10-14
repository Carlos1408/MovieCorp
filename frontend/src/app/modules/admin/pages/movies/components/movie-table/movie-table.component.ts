import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/interfaces/movie';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.scss'],
})
export class MovieTableComponent implements OnInit {
  @Input() movies!: Movie[];

  constructor() {}

  ngOnInit(): void {}
}
