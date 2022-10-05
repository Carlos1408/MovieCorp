import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() handledUser!: User;

  @Output() createUser = new EventEmitter<User>();

  userForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl(''),
    lastnames: new FormControl(''),
    birthdate: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {
    this.fillForm();
  }

  handleSubmit() {
    if (this.userForm.value.password === this.userForm.value.passwordConfirm) {
      this.createUser.emit(this.userForm.value);
      this.userForm.reset();
    } else console.log('passwords diferentes');
  }

  fillForm() {
    this.userForm.get('_id')?.setValue(this.handledUser._id);
    this.userForm.get('name')?.setValue(this.handledUser.name);
    this.userForm.get('lastnames')?.setValue(this.handledUser.lastnames);
    this.userForm.get('birthdate')?.setValue(this.handledUser.birthdate);
    this.userForm.get('phone')?.setValue(this.handledUser.phone);
    this.userForm.get('email')?.setValue(this.handledUser.email);
    this.userForm.get('password')?.setValue(this.handledUser.password);
    this.userForm.get('passwordConfirm')?.setValue(this.handledUser.password);
  }

  handleCancel() {
    this.userForm.reset();
  }
}
