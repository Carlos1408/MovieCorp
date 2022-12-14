import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  @Input() users!: User[];

  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  handleDelete(_id?: string) {
    this.deleteUser.emit(_id);
  }

  handleEdit(user: User) {
    this.editUser.emit(user);
  }
}
