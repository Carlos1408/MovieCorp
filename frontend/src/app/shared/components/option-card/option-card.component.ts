import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-option-card',
  templateUrl: './option-card.component.html',
  styleUrls: ['./option-card.component.scss']
})
export class OptionCardComponent implements OnInit {

  @Input() option!: { title: string; url: string; imagePath: string; };

  constructor() { }

  ngOnInit(): void {
  }

  testClick(): void {
    console.log('FUNCIONA');
  }

}
