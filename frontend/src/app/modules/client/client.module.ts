import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { BillboardComponent } from './pages/billboard/billboard.component';
import { MovieCardComponent } from './pages/billboard/movie-card/movie-card.component';
import { PrimengModule } from 'src/app/shared/primeng.module';


@NgModule({
  declarations: [
    ClientComponent,
    BillboardComponent,
    MovieCardComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    PrimengModule
  ]
})
export class ClientModule { }
