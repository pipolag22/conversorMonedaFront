import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoinsRoutingModule } from './coins-routing.module';
import { CoinsComponent } from './coins.component';
import { CreateCoinComponent } from 'src/app/components/create-coin/create-coin.component';

@NgModule({
  declarations: [CoinsComponent],
  imports: [CommonModule, FormsModule, CoinsRoutingModule, CreateCoinComponent],
})
export class CoinsModule {}
