import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  
  voucherForm: FormGroup = new FormGroup({
    names: new FormControl(''),
    ci: new FormControl(''),
    email: new FormControl(''),

  });

  constructor() { }

  ngOnInit(): void {
  }

}
