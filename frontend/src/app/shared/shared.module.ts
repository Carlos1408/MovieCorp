import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionCardComponent } from './components/option-card/option-card.component';
import { PrimengModule } from './primeng.module';

@NgModule({
  declarations: [OptionCardComponent],
  imports: [CommonModule, PrimengModule],
  exports: [OptionCardComponent],
})
export class SharedModule {}
