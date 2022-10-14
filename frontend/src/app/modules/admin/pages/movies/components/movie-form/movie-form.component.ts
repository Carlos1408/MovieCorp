import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss'],
})
export class MovieFormComponent implements OnInit {
  @Output() createMovie = new EventEmitter<any>();

  movieForm = new FormGroup({
    title: new FormControl(''),
    synopsis: new FormControl(''),
    genre: new FormControl(''),
    rating: new FormControl(''),
    length: new FormControl(''),
    protagonists: new FormControl(''),
    director: new FormControl(''),
    image: new FormControl(''),
    imageSrc: new FormControl(''),
    trailer: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  handleSubmit() {
    this.createMovie.emit(this.movieForm.value);
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.movieForm.patchValue({ image: file });
    }
  }
}
