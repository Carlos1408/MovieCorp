import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../interfaces/client';
import { Ticket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private URL_API = `${environment.API_BASE_URL}/api/v1/tickets`;

  private ticket = new BehaviorSubject<Ticket>({
    cinema_id: '',
    movie_id: '',
    room_id: '',
    function_id: '',
  });
  ticket$ = this.ticket.asObservable();

  isCinemaSelected$ = this.ticket$.pipe(
    map((ticket: Ticket) => Boolean(ticket.cinema_id))
  );

  isMovieSelected$ = this.ticket$.pipe(
    map((ticket: Ticket) => Boolean(ticket.movie_id))
  );

  isRoomSelected$ = this.ticket$.pipe(
    map((ticket: Ticket) => Boolean(ticket.room_id))
  );

  private mySeats = new BehaviorSubject<string[]>([]);
  mySeats$ = this.mySeats.asObservable();

  private occupedSeats: string[] = [];

  constructor(private cookieService: CookieService, private http: HttpClient) {}

  clearTicket(): void {
    this.ticket.next({
      cinema_id: '',
      movie_id: '',
      room_id: '',
      function_id: '',
    });
    this.cookieService.delete('cinema_id');
  }

  setCinema(cinema_id: string): void {
    this.cookieService.set('cinema_id', cinema_id);
    this.ticket.next({
      cinema_id,
      movie_id: '',
      room_id: '',
      function_id: '',
    });
  }

  public get cinema_id(): string {
    const cinema_id = this.ticket.getValue().cinema_id;
    if (cinema_id) return cinema_id;
    return '';
  }

  public get movie_id(): string {
    const movie_id = this.ticket.getValue().movie_id;
    if (movie_id) return movie_id;
    return '';
  }

  public get function_id(): string {
    const function_id = this.ticket.getValue().function_id;
    if (function_id) return function_id;
    return '';
  }

  setMovie(movie_id: string): void {
    const oldTicket = this.ticket.getValue();
    this.ticket.next({
      ...oldTicket,
      movie_id,
    });
  }

  setRoom(room_id: string): void {
    const oldTicket = this.ticket.getValue();
    this.ticket.next({
      ...oldTicket,
      room_id,
    });
  }

  setFunction(function_id: string): void {
    const oldTicket = this.ticket.getValue();
    this.ticket.next({
      ...oldTicket,
      function_id: function_id,
    });
  }

  clearSeats(): void {
    this.mySeats.next([]);
  }

  selectSeat(nSeat: string): void {
    const oldSeats = this.mySeats.getValue();
    this.mySeats.next([...oldSeats, nSeat]);
  }

  unSelectSeat(nSeat: string): void {
    const oldSeats = this.mySeats.getValue();
    this.mySeats.next(oldSeats.filter((seat) => seat !== nSeat));
  }

  setOccupedSeats(os: string[]): void {
    this.occupedSeats = os;
  }

  public get getOccupedSeats(): string[] {
    return this.occupedSeats;
  }

  showSeats(): void {
    console.log(this.mySeats.getValue());
  }

  buyTicket(client: Client): Observable<any> {
    const body = {
      ...this.ticket.getValue(),
      seats: this.mySeats.getValue(),
      client: client,
    };
    return this.http.post(this.URL_API, body);
  }
}
