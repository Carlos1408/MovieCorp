import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  @Input() showForm!: boolean;
  @Input() handledMovie!: Movie;

  @Output() closeForm = new EventEmitter();

  @Output() createMovie = new EventEmitter<any>();
  @Output() updateMovie = new EventEmitter<any>();

  movieForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    title: new FormControl('', Validators.required),
    synopsis: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
    length: new FormControl('', Validators.required),
    protagonists: new FormControl('', Validators.required),
    director: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    trailer: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}

  public get editMode(): boolean {
    return this.movieForm.get('_id')?.value;
  }

  onShow(): void {
    this.fillMovieForm();
  }

  closeDialog(): void {
    this.movieForm.reset();
    this.closeForm.emit();
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
    this.movieForm.get('trailer')?.setValue(this.handledMovie.trailer);
  }

  handleSubmit(): void {
    if (this.movieForm.valid) {
      if (this.movieForm.get('_id')?.value) {
        this.updateMovie.emit(this.movieForm.value);
      } else {
        this.createMovie.emit(this.movieForm.value);
      }
      this.closeDialog();
    } else {
      console.log('invalid');
    }
  }

  onFileChange(event: any): void {
    if (event.currentFiles.length > 0) {
      const file = event.currentFiles[0];
      this.movieForm.patchValue({ image: file });
    }
  }
}
