import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Function } from 'src/app/shared/interfaces/function';

@Component({
  selector: 'app-function-table',
  templateUrl: './function-table.component.html',
  styleUrls: ['./function-table.component.scss'],
})
export class FunctionTableComponent implements OnInit {
  @Input() functions!: Function[];

  @Output() deleteFunction = new EventEmitter<string>();
  @Output() showFunction = new EventEmitter<Function>();

  constructor() {}

  ngOnInit(): void {}

  handleDelete(_id?: string): void {
    this.deleteFunction.emit(_id);
  }

  handleShow(function_: Function) {
    this.showFunction.emit(function_);
  }
}
