import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription, tap } from 'rxjs';
import { ClientService } from 'src/app/core/services/client.service';
import { Function } from 'src/app/shared/interfaces/function';
import { Movie } from 'src/app/shared/interfaces/movie';
import { Room } from 'src/app/shared/interfaces/room';
import { FunctionService } from 'src/app/shared/services/function.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-room-function',
  templateUrl: './room-function.component.html',
  styleUrls: ['./room-function.component.scss'],
})
export class RoomFunctionComponent implements OnInit, OnDestroy {
  function_id!: string;
  function_!: Function;
  room!: Room;
  movie!: Movie;
  mySeatsSubscription!: Subscription;
  mySeats!: string[];
  BASE_URL = `${environment.API_BASE_URL}/`;

  constructor(
    private functionService: FunctionService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private router: Router,
    private messageService: MessageService
  ) {}

  public get totalPrice(): number {
    return this.mySeats.length * this.room.price;
  }

  ngOnInit(): void {
    this.getFunctionId();
    this.getFunction();
    this.clientService.clearSeats();
    this.mySeatsSubscription = this.clientService.mySeats$.subscribe(
      (seats) => (this.mySeats = seats)
    );
  }

  ngOnDestroy(): void {
    this.mySeatsSubscription.unsubscribe();
  }

  getFunctionId(): void {
    const function_id = this.route.snapshot.paramMap.get('id');
    if (function_id) this.function_id = function_id;
  }

  getFunction(): void {
    this.functionService
      .getFunctionLg(this.function_id)
      .pipe(
        tap((function_: Function) => {
          this.function_ = function_;
          if (function_.movie) this.movie = function_.movie;
          if (function_.room) this.room = function_.room;
        })
      )
      .subscribe();
  }

  handleSubmit(): void {
    this.clientService.showSeats();
    if (this.mySeats.length) this.router.navigateByUrl('/client/voucher');
    else
      this.messageService.add({
        severity: 'warn',
        summary: 'Butacas no seleccionadas',
        detail: 'No se han seleccionado butacas para la compra',
      });
  }
}
