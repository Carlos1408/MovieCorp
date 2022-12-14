import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { CarouselModule } from 'primeng/carousel';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MenubarModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    PasswordModule,
    CalendarModule,
    ConfirmDialogModule,
    ToastModule,
    DropdownModule,
    InputTextareaModule,
    FileUploadModule,
    ImageModule,
    CardModule,
    MultiSelectModule,
    CarouselModule,
    TooltipModule,
  ],
})
export class PrimengModule {}
