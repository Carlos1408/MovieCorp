import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Room } from 'src/app/shared/interfaces/room';;
import { RoomService } from 'src/app/shared/services/room.service';
@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit {
  

  @Output() createRoom = new EventEmitter<Room>();

  roomForm: FormGroup = new FormGroup({
    roomNum: new FormControl(''),
    nRows: new FormControl(''),
    nCol: new FormControl(''),
    price: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }
  handleSubmit(){
    this.createRoom.emit(this.roomForm.value);
    this.roomForm.reset();
  }

  handleCancel(){
    this.roomForm.reset();
  }

}
