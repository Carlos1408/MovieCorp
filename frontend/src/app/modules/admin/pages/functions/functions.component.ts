import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Function } from 'src/app/shared/interfaces/function';
import { FunctionService } from 'src/app/shared/services/function.service';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class FunctionsComponent implements OnInit {
  handledFunction: Function = {
    cinema_id: '',
    room_id: '',
    movie_id: '',
    from: '',
    to: '',
  };

  functions: Function[] = [];

  showForm: boolean = false;

  constructor(
    private functionService: FunctionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getFunctions();
  }

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.handledFunction = {
      cinema_id: '',
      room_id: '',
      movie_id: '',
      from: '',
      to: '',
    };
  }

  getFunctions() {
    this.functionService
      .getAllFunctionsLg()
      .pipe(tap((functions: Function[]) => (this.functions = functions)))
      .subscribe();
  }

  confirmDelete(_id: string) {
    this.confirmationService.confirm({
      header: 'Eliminar Funcion',
      message: 'Esta seguro que quiere eliminar la funcion?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteFunction(_id);
      },
    });
  }

  createFunction(function_: Function): void {
    this.functionService.createFunction(function_).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sala nueva',
          detail: 'Datos ingresados correctamente',
        });
        this.getFunctions();
      },
      error: (err) => console.log(err),
    });
  }

  deleteFunction(_id: string): void {
    this.functionService.deleteFunction(_id).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sala eliminada',
          detail: 'La sala ha sido eliminada correctamente',
        });
        this.getFunctions();
      },
      error: (err) => console.log(err),
    });
  }

  fillFunctionForm(function_: Function) {
    this.handledFunction = function_;
    this.openForm();
  }
}
