import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Cinema } from 'src/app/shared/interfaces/cinema';
import { Room } from 'src/app/shared/interfaces/room';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss'],
})
export class RoomFormComponent implements OnInit {
  @Input() showForm!: boolean;
  @Input() handleRoom!: Room;
  @Input() cinemas!: Cinema[];

  @Output() closeForm = new EventEmitter();
  @Output() createRoom = new EventEmitter<Room>();
  @Output() editRoom = new EventEmitter<Room>();

  roomForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    cinema_id: new FormControl('', Validators.required),
    roomNum: new FormControl('', Validators.required),
    nRows: new FormControl('', [
      Validators.required,
      Validators.min(5),
      Validators.max(15),
    ]),
    nCol: new FormControl('', [
      Validators.required,
      Validators.min(5),
      Validators.max(15),
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.min(5),
      Validators.max(75),
    ]),
  });

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  public get editMode(): boolean {
    return this.roomForm.get('_id')?.value;
  }

  onShow(): void {
    this.fillRoomForm();
  }

  closeDialog(): void {
    this.roomForm.get('cinema_id')?.enable();
    this.roomForm.reset();
    this.closeForm.emit();
  }

  fillRoomForm() {
    this.roomForm.get('_id')?.setValue(this.handleRoom._id);
    this.roomForm.get('cinema_id')?.setValue(this.handleRoom.cinema_id);
    this.roomForm.get('roomNum')?.setValue(this.handleRoom.roomNum);
    this.roomForm.get('nRows')?.setValue(this.handleRoom.nRows);
    this.roomForm.get('nCol')?.setValue(this.handleRoom.nCol);
    this.roomForm.get('price')?.setValue(this.handleRoom.price);

    if (this.editMode) this.roomForm.get('cinema_id')?.disable();
  }

  handleSubmit() {
    if (this.roomForm.valid) {
      if (this.roomForm.get('_id')?.value) {
        this.editRoom.emit(this.roomForm.value);
        this.closeDialog();
      } else {
        this.createRoom.emit(this.roomForm.value);
        this.closeDialog();
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario invalido',
        detail: 'Todos los datos deben ser llenados correctamente',
      });
    }
  }

  handleCancel() {
    this.closeDialog();
  }
}
