import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndfreeComponent } from './endfree.component';
import { EndfreeRoutingModule } from './endfree-routing.module';

@NgModule({
  declarations: [EndfreeComponent],
  imports: [CommonModule, EndfreeRoutingModule],
})
export class EndfreeModule {}
