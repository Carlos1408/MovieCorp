import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// primeng modules imports, debe estar importado y declarado en exports
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [MenubarModule],
})
export class PrimengModule {}
