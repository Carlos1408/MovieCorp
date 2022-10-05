import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  handledUser: User = {
    _id: '',
    name: '',
    lastnames: '',
    birthdate: '',
    phone: 0,
    email: '',
    password: '',
  };

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();    
  }

  getUsers(): void {
    this.userService
      .getAllUsers()
      .pipe(tap((users: User[]) => (this.users = users)))
      .subscribe();
  }

  createUser(user: User): void {
    this.userService.createUser(user).subscribe({
      next: (res) => {
        console.log(res);
        this.getUsers();
      },
      error: (err) => console.log(err),
    });
  }

  deleteUser(_id: string): void {
    this.userService.deleteUser(_id).subscribe({
      next: (res) => {
        console.log(res);
        this.getUsers();
      },
      error: (err) => console.log(err),
    });
  }

  fillForm(user: User) {
    this.handledUser = {
      _id: user._id,
      name: user.name,
      lastnames: user.lastnames,
      birthdate: user.birthdate,
      phone: user.phone,
      email: user.email,
      password: user.password,
    };
  }
}
