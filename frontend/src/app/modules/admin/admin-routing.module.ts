import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CinemasComponent } from './pages/cinemas/cinemas.component';
import { FunctionsComponent } from './pages/functions/functions.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { RoomsComponent } from './pages/rooms/rooms.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'cinemas', component: CinemasComponent},
  { path: 'rooms', component: RoomsComponent},
  { path: 'functions', component: FunctionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
