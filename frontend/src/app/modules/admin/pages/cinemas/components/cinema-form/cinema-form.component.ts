import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Cinema } from 'src/app/shared/interfaces/cinema';

@Component({
  selector: 'app-cinema-form',
  templateUrl: './cinema-form.component.html',
  styleUrls: ['./cinema-form.component.scss']
})
export class CinemaFormComponent implements OnInit {
  @Output() createCinema = new EventEmitter<Cinema>();

  cinemaForm: FormGroup= new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
  });
  constructor() { }

  ngOnInit(): void {
  }
  handleSubmit(){
    this.createCinema.emit(this.cinemaForm.value);
    this.cinemaForm.reset();
  }
   handleCancel(){
    this.cinemaForm.reset();
   }

}
