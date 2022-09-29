import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl(''),
    lastnames: new FormControl(''),
    birthdate: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit() {
    console.log(this.userForm.value);
    
  }

}
