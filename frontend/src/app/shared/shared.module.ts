import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionCardComponent } from './components/option-card/option-card.component';
import { PrimengModule } from './primeng.module';
import { OptionListComponent } from './components/option-list/option-list.component';

@NgModule({
  declarations: [OptionCardComponent, OptionListComponent],
  imports: [CommonModule, PrimengModule],
  exports: [OptionCardComponent, OptionListComponent],
})
export class SharedModule {}
