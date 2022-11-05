import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { BillboardComponent } from './pages/billboard/billboard.component';
import { MovieCardComponent } from './pages/billboard/movie-card/movie-card.component';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { TheatersComponent } from './pages/theaters/theaters.component';
import { CinemaCardComponent } from './pages/theaters/cinema-card/cinema-card.component';


@NgModule({
  declarations: [
    ClientComponent,
    BillboardComponent,
    MovieCardComponent,
    TheatersComponent,
    CinemaCardComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    PrimengModule
  ]
})
export class ClientModule { }
