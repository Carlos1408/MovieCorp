import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cinema-form',
  templateUrl: './cinema-form.component.html',
  styleUrls: ['./cinema-form.component.scss']
})
export class CinemaFormComponent implements OnInit {
  cinemaForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    nRooms: new FormControl(''),
    nMovies: new FormControl('')
  });
  constructor() { }

  ngOnInit(): void {
  }
  handleSubmit(){
    console.log(this.cinemaForm.value)
  }

}
