import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Cinema } from 'src/app/shared/interfaces/cinema';
import { CinemaService } from 'src/app/shared/services/cinema.service';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent implements OnInit {

  cinemas: Cinema[] = [];

  constructor( private cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.getCinemas();
  }

  getCinemas(): void {
    this.cinemaService
    .getAllCinemas()
    .pipe(tap((cinemas: Cinema[]) => (this.cinemas = cinemas)))
    .subscribe();
  }

  createCinema( cinema: Cinema): void {
    this.cinemaService.createCinema(cinema).subscribe({
      next: (res) => {
        this.getCinemas();
      },
      error: (err) => console.log(err),
    });
  }

  deleteCinema(_id: string): void {
    this.cinemaService.deleteCinema(_id).subscribe({
      next: (res) => {
        this.getCinemas();
      },
      error: (err) => console.log(err),
    })
  }

}
