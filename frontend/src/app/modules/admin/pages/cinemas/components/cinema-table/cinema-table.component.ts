import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cinema } from 'src/app/shared/interfaces/cinema';

@Component({
  selector: 'app-cinema-table',
  templateUrl: './cinema-table.component.html',
  styleUrls: ['./cinema-table.component.scss']
})
export class CinemaTableComponent implements OnInit {
   @Input() cinemas!: Cinema[];
   @Output() deletCinema = new EventEmitter<string>();
   @Output() editCinema = new EventEmitter<Cinema>();

  constructor() { }

  ngOnInit(): void {}

  handleDelete(_id?: string): void{
    if(confirm('Seguro que desea eliminar?')){
      this.deletCinema.emit(_id);
    }
  }

  handleEdit(cinema: Cinema){
    this.editCinema.emit(cinema);
  }

}
