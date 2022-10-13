import { AbstractControl, FormGroup } from "@angular/forms";

export interface Room {
    _id?: string;
    roomNum: string;
    nRows: number;
    nCol: number;
    price: number;
    createAt?: string;
    updateAt?: string;
}