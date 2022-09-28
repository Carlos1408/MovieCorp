import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss'],
})
export class MovieFormComponent implements OnInit {
  movieForm = new FormGroup({
    title: new FormControl(''),
    synopsis: new FormControl(''),
    genre: new FormControl(''),
    length: new FormControl(''),
    protagonists: new FormControl(''),
    director: new FormControl(''),
    image: new FormControl(''),
    trailer: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  handleSubmit() {
    console.log(this.movieForm.value);
    
  }
}
