import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  @Input() users!: User[];

  @Output() deleteUser = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  handleDelete(_id?: string) {
    console.log(_id);
    if (confirm('Seguro que quiere eliminar el usuario?')) {
      this.deleteUser.emit(_id);
    }
  }
}
