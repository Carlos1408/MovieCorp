import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('carlos@gmail.com', Validators.required),
    password: new FormControl('contrasegura123', Validators.required),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  handleSubmit(): void {
    this.authService.logIn(this.loginForm.value).subscribe();
  }

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  }
}
