import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieFormComponent } from './pages/movies/components/movie-form/movie-form.component';
import { MovieTableComponent } from './pages/movies/components/movie-table/movie-table.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminComponent, MoviesComponent, MovieFormComponent, MovieTableComponent],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule],
})
export class AdminModule {}
