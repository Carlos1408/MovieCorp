import { AbstractControl, FormGroup } from '@angular/forms';

export interface User {
  _id?: string;
  name: string;
  lastnames: string;
  birthdate: string;
  phone: number;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}