import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-option-card',
  templateUrl: './option-card.component.html',
  styleUrls: ['./option-card.component.scss'],
})
export class OptionCardComponent implements OnInit {
  @Input() name!: string;
  @Input() url!: string;
  @Input() imagePath!: string;

  constructor() {}

  ngOnInit(): void {
  }

}
