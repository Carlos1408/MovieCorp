import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { BillboardComponent } from './pages/billboard/billboard.component';
import { MovieCardComponent } from './pages/billboard/movie-card/movie-card.component';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { TheatersComponent } from './pages/theaters/theaters.component';
import { CinemaCardComponent } from './pages/theaters/cinema-card/cinema-card.component';
import { MovieComponent } from './pages/movie/movie.component';
import { MoviePropertyComponent } from './pages/movie/components/movie-property/movie-property.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [
    ClientComponent,
    BillboardComponent,
    MovieCardComponent,
    TheatersComponent,
    CinemaCardComponent
    MovieComponent,
    MoviePropertyComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    PrimengModule,
    YouTubePlayerModule,
  ],
})
export class ClientModule {}
