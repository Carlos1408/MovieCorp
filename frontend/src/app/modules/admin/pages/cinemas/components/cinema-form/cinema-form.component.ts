import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Cinema } from 'src/app/shared/interfaces/cinema';
import { Movie } from 'src/app/shared/interfaces/movie';

@Component({
  selector: 'app-cinema-form',
  templateUrl: './cinema-form.component.html',
  styleUrls: ['./cinema-form.component.scss'],
})
export class CinemaFormComponent implements OnInit {
  public get editMode(): boolean {
    return this.cinemaForm.get('_id')?.value;
  }

  @Input() showForm!: boolean;
  @Input() movies!: Movie[];
  @Input() handleCinema!: Cinema;

  @Output() closeForm = new EventEmitter();
  @Output() createCinema = new EventEmitter<Cinema>();
  @Output() editCinema = new EventEmitter<Cinema>();

  cinemaForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
    image: new FormControl(''),
    movies_ids: new FormControl(''),
  });
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  onShow(): void {
    this.fillcinemaForm();
  }

  closeDialog(): void {
    this.cinemaForm.reset();
    this.closeForm.emit();
  }

  fillcinemaForm(): void {
    this.cinemaForm.get('_id')?.setValue(this.handleCinema._id);
    this.cinemaForm.get('name')?.setValue(this.handleCinema.name);
    this.cinemaForm.get('address')?.setValue(this.handleCinema.address);
    this.cinemaForm.get('image')?.setValue('');
    this.cinemaForm.get('movies_ids')?.setValue(this.handleCinema.movies_ids);
  }

  handleSubmit(): void {
    if (this.cinemaForm.valid) {
      if (this.editMode) {
        this.editCinema.emit(this.cinemaForm.value);
        this.closeDialog();
      } else {
        this.createCinema.emit(this.cinemaForm.value);
        this.closeDialog();
      }
    }
  }

  onFileChange(event: any): void {
    if (event.currentFiles.length > 0) {
      const file = event.currentFiles[0];
      this.cinemaForm.patchValue({ image: file });
    }
  }
}
