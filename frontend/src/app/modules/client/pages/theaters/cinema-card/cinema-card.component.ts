import { Component, Input, OnInit } from '@angular/core';
import { Cinema } from 'src/app/shared/interfaces/cinema';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cinema-card',
  templateUrl: './cinema-card.component.html',
  styleUrls: ['./cinema-card.component.scss']
})
export class CinemaCardComponent implements OnInit {
  @Input() cinema!: { name: string; imagePath: string};

  constructor() { }

  ngOnInit(): void {
    console.log(this.cinema)
  }

  URL_API = `${environment.API_BASE_URL}/`;
}
