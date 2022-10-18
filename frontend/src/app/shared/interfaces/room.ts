import { AbstractControl, FormGroup } from '@angular/forms';

export interface Room {
  _id?: string;
  cinema_id?: string;
  roomNum: string;
  nRows: number;
  nCol: number;
  price: number;
  timeRanges: Array<Array<string>>;
  createAt?: string;
  updateAt?: string;
}
