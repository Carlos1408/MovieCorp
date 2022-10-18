import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { BillboardComponent } from './pages/billboard/billboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/client/billboard', pathMatch: 'full' },
  { path: 'billboard', component: BillboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
