import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, map } from 'rxjs';
import { Ticket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
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

  constructor(private cookieService: CookieService) {}

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

  setMovie(movie_id: string): void {
    const oldTicket = this.ticket.getValue();
    this.ticket.next({
      cinema_id: oldTicket.cinema_id,
      movie_id,
    });
  }

  setRoom(room_id: string): void {
    const oldTicket = this.ticket.getValue();
    this.ticket.next({
      cinema_id: oldTicket.cinema_id,
      movie_id: oldTicket.movie_id,
      room_id,
    });
  }

  setFunction(function_id: string): void {
    const oldTicket = this.ticket.getValue();
    this.ticket.next({
      cinema_id: oldTicket.cinema_id,
      function_id: function_id,
    });
  }
}
