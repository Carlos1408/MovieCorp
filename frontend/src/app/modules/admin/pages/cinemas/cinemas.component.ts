import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { Cinema } from 'src/app/shared/interfaces/cinema';
import { CinemaService } from 'src/app/shared/services/cinema.service';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss'],
  providers: [MessageService],
})
export class CinemasComponent implements OnInit {
  handleCinema: Cinema = {
    name: '',
    address: '',
  };

  cinemas: Cinema[] = [];
  showForm: boolean = false;

  constructor( 
    private cinemaService: CinemaService,
    private messageSerice: MessageService
  ) { }

  ngOnInit(): void {
    this.getCinemas();
  }

  openForm(): void{
    this.showForm = true;
  }

  closeForm(): void{
    this.showForm = false;
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
        this.messageSerice.add({
          severity: 'success',
          summary: 'Nuevo Cine',
          detail: 'Datos agregados correctamente'
        });
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

  updateCinema(cinema: Cinema): void {
    this.cinemaService.updateCinema(cinema).subscribe({
      next: (res) => {
        
        this.getCinemas();
      },
      error: (err) => console.log(err),
    });
  }

  fillCinemaForm(cinema: Cinema): void {
    this.cinemaService.fillCinemaForm(cinema);
  }

}
