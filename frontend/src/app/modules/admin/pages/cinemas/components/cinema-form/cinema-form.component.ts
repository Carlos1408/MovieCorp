import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Cinema } from 'src/app/shared/interfaces/cinema';
import { CinemaService } from 'src/app/shared/services/cinema.service';

@Component({
  selector: 'app-cinema-form',
  templateUrl: './cinema-form.component.html',
  styleUrls: ['./cinema-form.component.scss']
})
export class CinemaFormComponent implements OnInit {

  handleCinema: Cinema = {
    name: '',
    address: '',
  };

  @Output() createCinema = new EventEmitter<Cinema>();
  @Output() editCinema = new EventEmitter<Cinema>();

  cinemaForm: FormGroup= new FormGroup({
    _id: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
  });
  constructor(private cinemaService: CinemaService) { }

  ngOnInit(): void {

    this.cinemaService.$fillCinemaForm.subscribe((cinema)=>{
      this.handleCinema = cinema;
      this.fillcinemaForm();
    });
  }

  fillcinemaForm() {
    this.cinemaForm.get('_id')?.setValue(this.handleCinema._id);
    this.cinemaForm.get('name')?.setValue(this.handleCinema.name);
    this.cinemaForm.get('address')?.setValue(this.handleCinema.address);
  }

  handleSubmit(){

    if ( this.cinemaForm.get('_id')?.value) {
      this.editCinema.emit(this.cinemaForm.value);
    } else {
      this.createCinema.emit(this.cinemaForm.value);
    }

    this.cinemaForm.reset();
  }
   handleCancel(){
    this.cinemaForm.reset();
   }

}
