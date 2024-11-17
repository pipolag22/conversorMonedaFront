import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndfreeComponent } from './endfree.component';

const routes: Routes = [
  {
    path: "",
    component : EndfreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndfreeRoutingModule { }
