import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionCardComponent } from './components/option-card/option-card.component';
import { PrimengModule } from './primeng.module';
import { OptionListComponent } from './components/option-list/option-list.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';

@NgModule({
  declarations: [OptionCardComponent, OptionListComponent, TitleBarComponent],
  imports: [CommonModule, PrimengModule],
  exports: [OptionCardComponent, OptionListComponent, TitleBarComponent],
})
export class SharedModule {}
