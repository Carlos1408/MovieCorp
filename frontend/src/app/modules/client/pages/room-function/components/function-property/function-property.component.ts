import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-function-property',
  templateUrl: './function-property.component.html',
  styleUrls: ['./function-property.component.scss'],
})
export class FunctionPropertyComponent implements OnInit {
  @Input() title!: string;
  @Input() value!: string | number;

  constructor() {}

  ngOnInit(): void {}
}
