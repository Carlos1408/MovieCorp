import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit {
  roomForm = new FormGroup({
    nRows: new FormControl(''),
    nCol: new FormControl(''),
    price: new FormControl(''),
    roomNum: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }
  handleSubmit(){
    console.log(this.roomForm.value)
  }

}
