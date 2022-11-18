import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-seats-matrix',
  templateUrl: './seats-matrix.component.html',
  styleUrls: ['./seats-matrix.component.scss'],
})
export class SeatsMatrixComponent implements OnInit {
  @Input() nCols!: number;
  colArr!: Array<number>;

  @Input() nRows!: number;
  rowArr!: Array<number>;

  constructor() {}

  ngOnInit(): void {
    this.colArr = Array(this.nCols)
      .fill(0)
      .map((x, i) => i + 1);

    this.rowArr = Array(this.nRows)
      .fill(0)
      .map((x, i) => i + 1);
  }
}
