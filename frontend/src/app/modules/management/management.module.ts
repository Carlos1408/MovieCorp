import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { UsersComponent } from './pages/users/users.component';
import { UserFormComponent } from './pages/users/components/user-form/user-form.component';
import { UserTableComponent } from './pages/users/components/user-table/user-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/primeng.module';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ManagementComponent,
    UsersComponent,
    UserFormComponent,
    UserTableComponent,
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule
  ],
})
export class ManagementModule {}
