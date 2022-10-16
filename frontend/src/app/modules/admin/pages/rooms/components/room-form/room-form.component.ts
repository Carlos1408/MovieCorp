import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Room } from 'src/app/shared/interfaces/room';;
import { RoomService } from 'src/app/shared/services/room.service';
@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit {

  
  
  @Input() showForm!: boolean;
  @Input() handleRoom!: Room;

  @Output() closeForm = new EventEmitter();
  @Output() createRoom = new EventEmitter<Room>();
  @Output() editRoom = new EventEmitter<Room>();

  roomForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    roomNum: new FormControl(''),
    nRows: new FormControl(''),
    nCol: new FormControl(''),
    price: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {}

  onShow(): void {
    this.fillRoomForm();
  }

  closeDialog(): void {
    this.roomForm.reset();
    this.closeForm.emit();
  }

  fillRoomForm(){
    this.roomForm.get('_id')?.setValue(this.handleRoom._id);
    this.roomForm.get('roomNum')?.setValue(this.handleRoom.roomNum);
    this.roomForm.get('nRows')?.setValue(this.handleRoom.nRows);
    this.roomForm.get('nCol')?.setValue(this.handleRoom.nCol);
    this.roomForm.get('price')?.setValue(this.handleRoom.price);
  }

  handleSubmit(){
    this.createRoom.emit(this.roomForm.value);
    this.closeDialog();
  }

  handleCancel(){
    this.closeDialog();
  }

}
