import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  showForm: boolean = false;

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  confirmDelete(_id: string) {
    this.confirmationService.confirm({
      message: 'Esta seguro que quiere eliminar el usuario?',
      header: 'Eliminar usuario',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser(_id);
        this.messageService.add({
          severity: 'success',
          summary: 'Usuario eliminado',
          detail: 'El usuario ha sido eliminado',
        });
      },
    });
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

  updateUser(user: User): void {
    this.userService.updateUser(user).subscribe({
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

  fillUserForm(user: User): void {
    this.userService.fillUserForm(user);
  }
}
