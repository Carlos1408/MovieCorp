import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Movie } from 'src/app/shared/interfaces/movie';
import { MovieService } from 'src/app/shared/services/movie.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss'],
})
export class MovieFormComponent implements OnInit {
  handledMovie: Movie = {
    title: '',
    synopsis: '',
    genre: '',
    rating: '',
    length: 0,
    protagonists: '',
    director: '',
    imagePath: '',
    trailer: '',
  };

  @Output() createMovie = new EventEmitter<any>();
  @Output() updateMovie = new EventEmitter<any>();

  movieForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
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

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.$fillMovieForm.subscribe((movie) => {
      this.handledMovie = movie;
      this.fillMovieForm();
    });
  }

  fillMovieForm(): void {
    this.movieForm.get('_id')?.setValue(this.handledMovie._id);
    this.movieForm.get('title')?.setValue(this.handledMovie.title);
    this.movieForm.get('synopsis')?.setValue(this.handledMovie.synopsis);
    this.movieForm.get('genre')?.setValue(this.handledMovie.genre);
    this.movieForm.get('rating')?.setValue(this.handledMovie.rating);
    this.movieForm.get('length')?.setValue(this.handledMovie.length);
    this.movieForm
      .get('protagonists')
      ?.setValue(this.handledMovie.protagonists);
    this.movieForm.get('director')?.setValue(this.handledMovie.director);
    this.movieForm.get('image')?.setValue('');
    this.movieForm.get('imageSrc')?.setValue('');
    this.movieForm.get('trailer')?.setValue(this.handledMovie.trailer);
  }

  handleSubmit() {
    if (this.movieForm.get('_id')?.value) {
      this.updateMovie.emit(this.movieForm.value);
    } else {
      this.createMovie.emit(this.movieForm.value);
    }
    this.movieForm.reset();
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.movieForm.patchValue({ image: file });
    }
  }
}
