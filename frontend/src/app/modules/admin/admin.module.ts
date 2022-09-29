import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieFormComponent } from './pages/movies/components/movie-form/movie-form.component';
import { MovieTableComponent } from './pages/movies/components/movie-table/movie-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CinemasComponent } from './pages/cinemas/cinemas.component';
import { CinemaTableComponent } from './pages/cinemas/components/cinema-table/cinema-table.component';
import { CinemaFormComponent } from './pages/cinemas/components/cinema-form/cinema-form.component';

@NgModule({
  declarations: [AdminComponent, MoviesComponent, MovieFormComponent, MovieTableComponent, CinemasComponent, CinemaTableComponent, CinemaFormComponent],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule],
})
export class AdminModule {}
