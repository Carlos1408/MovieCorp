import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [],
})
export class UsersComponent implements OnInit {
  handledUser: User = {
    name: '',
    lastnames: '',
    birthdate: '',
    phone: 0,
    email: '',
    role: '',
    password: '',
  };

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
    this.handledUser = {
      name: '',
      lastnames: '',
      birthdate: '',
      phone: 0,
      email: '',
      role: '',
      password: '',
    };
  }

  confirmDelete(_id: string) {
    this.confirmationService.confirm({
      header: 'Eliminar usuario',
      message: 'Esta seguro que quiere eliminar el usuario?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser(_id);
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
        this.messageService.add({
          severity: 'success',
          summary: 'Usuario nuevo',
          detail: 'El usuario ha sido creado exitosamente',
        });
        this.getUsers();
      },
      error: (err) => console.log(err),
    });
  }

  updateUser(user: User): void {
    this.userService.updateUser(user).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Usuario actualizado',
          detail: 'El usuario ha sido actualizado exitosamente',
        });
        this.getUsers();
      },
      error: (err) => console.log(err),
    });
  }

  deleteUser(_id: string): void {
    this.userService.deleteUser(_id).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Usuario eliminado',
          detail: 'El usuario ha sido eliminado exitosamente',
        });
        this.getUsers();
      },
      error: (err) => console.log(err),
    });
  }

  fillUserForm(user: User): void {
    this.handledUser = user;
    this.openForm();
  }
}
