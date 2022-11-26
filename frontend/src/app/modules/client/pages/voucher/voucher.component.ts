import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss'],
})
export class VoucherComponent implements OnInit {
  voucherForm: FormGroup = new FormGroup({
    names: new FormControl('', Validators.required),
    ci: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {}

  handleSubmit(): void {
    this.clientService.buyTicket(this.voucherForm.value);
  }

  handleCancel(): void {
    this.router.navigateByUrl(`/client/room-function/${this.clientService.function_id}`);
  }
}
