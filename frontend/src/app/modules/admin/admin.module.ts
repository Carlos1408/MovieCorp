import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieFormComponent } from './pages/movies/components/movie-form/movie-form.component';
import { MovieTableComponent } from './pages/movies/components/movie-table/movie-table.component';
import { CinemasComponent } from './pages/cinemas/cinemas.component';
import { CinemaTableComponent } from './pages/cinemas/components/cinema-table/cinema-table.component';
import { CinemaFormComponent } from './pages/cinemas/components/cinema-form/cinema-form.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { RoomTableComponent } from './pages/rooms/components/room-table/room-table.component';
import { RoomFormComponent } from './pages/rooms/components/room-form/room-form.component';
import { PrimengModule } from 'src/app/shared/primeng.module';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    MoviesComponent,
    MovieFormComponent,
    MovieTableComponent,
    CinemasComponent,
    CinemaTableComponent,
    CinemaFormComponent,
    RoomsComponent,
    RoomFormComponent,
    RoomTableComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule,
  ],
})
export class AdminModule {}
