import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Output() createUser = new EventEmitter<User>();

  userForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    lastnames: new FormControl(''),
    birthdate: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  handleSubmit() {
    if (this.userForm.value.password === this.userForm.value.passwordConfirm) {
      this.createUser.emit(this.userForm.value);
      this.userForm.reset();
    } else console.log('passwords diferentes');
  }

  handleCancel() {
    this.userForm.reset();
  }
}
