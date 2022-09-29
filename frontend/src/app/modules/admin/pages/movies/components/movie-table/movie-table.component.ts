import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.scss']
})
export class MovieTableComponent implements OnInit {

  movies = [
    {
      title: 'pelicula 1',
      genre: 'terror',
      rating: 'good',
      length: '2:30'
    },
    {
      title: 'pelicula 2',
      genre: 'suspenso',
      rating: 'bad',
      length: '1:40'
    },
    {
      title: 'pelicula 3',
      genre: 'romantica',
      rating: 'good',
      length: '2:00'
    },
    {
      title: 'pelicula 4',
      genre: 'comedia',
      rating: 'excelent',
      length: '1:30'
    },
    {
      title: 'pelicula 5',
      genre: 'terror',
      rating: 'bad',
      length: '2:30'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
