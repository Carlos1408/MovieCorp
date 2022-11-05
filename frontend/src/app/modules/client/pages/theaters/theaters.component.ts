import { Component, OnInit, Output } from '@angular/core';
import { tap } from 'rxjs';
import { Cinema } from 'src/app/shared/interfaces/cinema';
import { CinemaService } from 'src/app/shared/services/cinema.service';

@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.scss']
})
export class TheatersComponent implements OnInit {
  cinemas!: Cinema[];

  constructor(private cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.getCinemas();
    console.log(this.cinemas)
  }
  getCinemas(): void {
    this.cinemaService
      .getAllCinemas()
      .pipe(tap((cinemas: Cinema[]) => (this.cinemas = cinemas)))
      .subscribe();
    console.log(this.cinemas)
  }

}
