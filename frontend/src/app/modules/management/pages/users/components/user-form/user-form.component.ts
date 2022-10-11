import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  handledUser: User = {
    name: '',
    lastnames: '',
    birthdate: '',
    phone: 0,
    email: '',
    password: '',
  };

  @Output() createUser = new EventEmitter<User>();
  @Output() editUser = new EventEmitter<User>();

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log(this.userForm.value);

    this.userService.$fillUserForm.subscribe((user) => {
      this.handledUser = user;
      this.fillUserForm();
    });
  }

  fillUserForm() {
    this.userForm.get('_id')?.setValue(this.handledUser._id);
    this.userForm.get('name')?.setValue(this.handledUser.name);
    this.userForm.get('lastnames')?.setValue(this.handledUser.lastnames);
    this.userForm.get('birthdate')?.setValue(this.handledUser.birthdate);
    this.userForm.get('phone')?.setValue(this.handledUser.phone);
    this.userForm.get('email')?.setValue(this.handledUser.email);
  }

  handleSubmit() {
    if (this.userForm.get('_id')?.value) {
      this.editUser.emit(this.userForm.value);
    } else {
      if (
        this.userForm.value.password === this.userForm.value.passwordConfirm
      ) {
        this.createUser.emit(this.userForm.value);
      } else console.log('passwords diferentes');
    }
    this.userForm.reset();
  }

  handleCancel() {
    this.userForm.reset();
  }
}
