import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EndfreeRoutingModule } from './endfree-routing.module';
import { EndfreeComponent } from './endfree.component';


@NgModule({
  declarations: [
    EndfreeComponent
  ],
  imports: [
    CommonModule,
    EndfreeRoutingModule
  ]
})
export class EndfreeModule { }
