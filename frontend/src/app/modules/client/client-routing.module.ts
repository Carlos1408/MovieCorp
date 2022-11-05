import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { BillboardComponent } from './pages/billboard/billboard.component';
import { MovieComponent } from './pages/movie/movie.component';

const routes: Routes = [
  { path: '', redirectTo: 'billboard', pathMatch: 'full' },
  { path: 'billboard', component: BillboardComponent },
  { path: 'movie/:id', component: MovieComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
