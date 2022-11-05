import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-property',
  templateUrl: './movie-property.component.html',
  styleUrls: ['./movie-property.component.scss'],
})
export class MoviePropertyComponent implements OnInit {
  @Input() title!: string;
  @Input() property!: string | number;
  @Input() br: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
