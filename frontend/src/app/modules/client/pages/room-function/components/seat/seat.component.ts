import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.scss'],
})
export class SeatComponent implements OnInit, OnDestroy {
  @Input() nCols!: number;
  @Input() nSeat!: string;
  isSelected!: boolean;
  occuped: boolean = false;
  size!: any;
  nSeats!: number;
  nSeatsSubscription!: Subscription;

  public get seatClass(): string {
    if (this.occuped) return 'bg-red-600 hover:bg-red-400';
    else {
      return this.isSelected
        ? 'bg-green-600 hover:bg-green-400'
        : 'bg-gray-100 hover:bg-gray-300';
    }
  }

  public get seatSize(): string {
    if (this.nCols <= 5) return 'h-5rem w-5rem';
    return 'h-2rem w-2rem md:h-3rem md:w-3rem lg:h-5rem lg:w-5rem text-xs md:text-sm lg:text-xl';
  }

  constructor(
    private messageService: MessageService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.nSeatsSubscription = this.clientService.mySeats$.subscribe((seats) => {
      this.nSeats = seats.length;
      this.isSelected = seats.includes(this.nSeat);
    });
    this.occuped = this.clientService.getOccupedSeats.includes(this.nSeat);
  }

  ngOnDestroy(): void {
    this.nSeatsSubscription.unsubscribe();
  }

  toggleSelect(): void {
    if (!this.occuped) {
      if (!this.isSelected) {
        if (this.nSeats < 6) {
          this.clientService.selectSeat(this.nSeat);
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Limite de butacas',
            detail: 'Solo puede seleccionar 6 butacas por persona',
          });
        }
      } else {
        this.clientService.unSelectSeat(this.nSeat);
      }
    }
    if (this.occuped)
      this.messageService.add({
        severity: 'warn',
        summary: 'Butaca ocupada',
        detail: 'La butaca ya ha sido ocupada',
      });
  }
}
