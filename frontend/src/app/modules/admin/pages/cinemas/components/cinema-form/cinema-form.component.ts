import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Cinema } from 'src/app/shared/interfaces/cinema';
import { CinemaService } from 'src/app/shared/services/cinema.service';

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
  @Input() handleCinema!: Cinema;

  @Output() closeForm = new EventEmitter();
  @Output() createCinema = new EventEmitter<Cinema>();
  @Output() editCinema = new EventEmitter<Cinema>();

  cinemaForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
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

  fillcinemaForm() {
    this.cinemaForm.get('_id')?.setValue(this.handleCinema._id);
    this.cinemaForm.get('name')?.setValue(this.handleCinema.name);
    this.cinemaForm.get('address')?.setValue(this.handleCinema.address);
  }

  handleSubmit() {
    if (this.cinemaForm.valid) {
      if (this.cinemaForm.get('_id')?.value) {
        this.editCinema.emit(this.cinemaForm.value);
        this.closeDialog();
      } else {
        this.createCinema.emit(this.cinemaForm.value);
        this.closeDialog();
      }
    }
  }
}
