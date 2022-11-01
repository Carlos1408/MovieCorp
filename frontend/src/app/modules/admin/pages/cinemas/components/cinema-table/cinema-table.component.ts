import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cinema } from 'src/app/shared/interfaces/cinema';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cinema-table',
  templateUrl: './cinema-table.component.html',
  styleUrls: ['./cinema-table.component.scss'],
})
export class CinemaTableComponent implements OnInit {
  @Input() cinemas!: Cinema[];

  @Output() deletCinema = new EventEmitter<string>();
  @Output() editCinema = new EventEmitter<Cinema>();

  constructor() {}
  URL_API = `${environment.API_BASE_URL}/`;

  ngOnInit(): void {}

  handleDelete(_id?: string): void {
    this.deletCinema.emit(_id);
  }

  handleEdit(cinema: Cinema) {
    this.editCinema.emit(cinema);
  }
}
