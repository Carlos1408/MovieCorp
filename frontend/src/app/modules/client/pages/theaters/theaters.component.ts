import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, tap } from 'rxjs';
import { ClientService } from 'src/app/core/services/client.service';
import { Cinema } from 'src/app/shared/interfaces/cinema';
import { CinemaService } from 'src/app/shared/services/cinema.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.scss'],
})
export class TheatersComponent implements OnInit {
  API_URL = `${environment.API_BASE_URL}/`;
  cinemas!: Cinema[];
  clientSubscription!: Subscription;

  constructor(
    private cinemaService: CinemaService,
    private clientService: ClientService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCinemas();
    this.clientService.clearTicket();
  }

  getCinemas(): void {
    this.cinemaService
      .getAllCinemas()
      .pipe(tap((cinemas: Cinema[]) => (this.cinemas = cinemas)))
      .subscribe();
  }

  checkCinemaSelected(): void {
    const cinema_id = this.cookieService.get('cinema_id');
    if (cinema_id) this.router.navigateByUrl(`/client/billboard/${cinema_id}`);
  }
}
