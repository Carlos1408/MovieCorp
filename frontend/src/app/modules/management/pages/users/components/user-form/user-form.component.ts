import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/shared/interfaces/user';

interface Rol {
  name: string;
  code: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  roles: Rol[] = [
    {
      name: 'Administrador',
      code: 'admin',
    },
    { name: 'Gerente', code: 'manager' },
  ];

  @Input() showForm!: boolean;
  @Input() handledUser!: User;

  @Output() closeForm = new EventEmitter();

  @Output() createUser = new EventEmitter<User>();
  @Output() editUser = new EventEmitter<User>();

  userForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl('', Validators.required),
    lastnames: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    rol: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  public get editMode(): boolean {
    return this.userForm.get('_id')?.value;
  }

  onShow(): void {
    this.fillUserForm();
  }

  closeDialog(): void {
    this.userForm.reset();
    this.closeForm.emit();
  }

  fillUserForm() {
    this.userForm.get('_id')?.setValue(this.handledUser._id);
    this.userForm.get('name')?.setValue(this.handledUser.name);
    this.userForm.get('lastnames')?.setValue(this.handledUser.lastnames);
    this.userForm.get('birthdate')?.setValue(this.handledUser.birthdate);
    this.userForm.get('phone')?.setValue(this.handledUser.phone);
    this.userForm.get('rol')?.setValue(this.handledUser.rol);
    this.userForm.get('email')?.setValue(this.handledUser.email);
    this.userForm.get('password')?.setValue(this.handledUser.password);
    this.userForm.get('passwordConfirm')?.setValue(this.handledUser.password);
  }

  handleSubmit() {
    if (this.userForm.valid) {
      if (this.editMode) {
        this.editUser.emit(this.userForm.value);
        this.closeDialog();
      } else {
        if (
          this.userForm.value.password === this.userForm.value.passwordConfirm
        ) {
          this.createUser.emit(this.userForm.value);
          this.closeDialog();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Contraseñas diferentes',
            detail: 'Las contraseñas deben ser iguales',
          });
        }
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario invalido',
        detail: 'Todos los datos deben ser llenados correctamente',
      });
    }
  }
}
