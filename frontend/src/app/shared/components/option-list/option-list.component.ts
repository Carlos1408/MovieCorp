import { Component, Input, OnInit } from '@angular/core';
import { Option } from 'src/app/core/interfaces/option';
import { Cinema } from '../../interfaces/cinema';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss'],
})
export class OptionListComponent implements OnInit {
  @Input() options!: Array<Option>;

  constructor() {}

  ngOnInit(): void {
  }
}
