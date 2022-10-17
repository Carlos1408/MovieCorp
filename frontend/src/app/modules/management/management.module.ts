import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { UsersComponent } from './pages/users/users.component';
import { UserFormComponent } from './pages/users/components/user-form/user-form.component';
import { UserTableComponent } from './pages/users/components/user-table/user-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/primeng.module';

import { OptionCardComponent } from 'src/app/shared/components/option-card/option-card.component';

@NgModule({
  declarations: [
    ManagementComponent,
    UsersComponent,
    UserFormComponent,
    UserTableComponent,
    OptionCardComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ReactiveFormsModule,
    PrimengModule,
  ],
})
export class ManagementModule {}
