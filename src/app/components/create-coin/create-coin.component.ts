import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinsService } from 'src/app/services/coins.service';
import { FormsModule } from '@angular/forms';
import { Moneda } from 'src/app/interfaces/Moneda';
import { Router } from '@angular/router';
import { mensajeError, mensajeOkey } from 'src/app/helpers/mensajes';

@Component({
  selector: 'app-create-coin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-coin.component.html',
  styleUrls: ['./create-coin.component.scss'],
})
export class CreateCoinComponent implements OnInit {
  coinsService = inject(CoinsService);
  router = inject(Router);

  @Output() cerrar = new EventEmitter();
  @Output() monedaCreada = new EventEmitter<Moneda>(); // Nuevo EventEmitter
  @Input() moneda: Moneda = {
    id: 0,
    leyenda: '',
    simbolo: '',
    ic: 0,
  };
  @Input() isEditMode: boolean = false;

  ngOnInit(): void {
    const mensaje = localStorage.getItem('mensajeOkey');
    if (mensaje) {
      mensajeOkey(mensaje);
      localStorage.removeItem('mensajeOkey');
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.coinsService.edit(this.moneda.leyenda, this.moneda).then((res) => {
        if (res) {
          mensajeOkey('Moneda editada correctamente');
          this.cerrar.emit();
        } else {
          mensajeError('Error al editar la moneda');
        }
      });
    } else {
      this.coinsService.create(this.moneda).then((res) => {
        if (res) {
          mensajeOkey('Moneda creada correctamente');
          this.monedaCreada.emit(this.moneda);
          this.cerrar.emit();
        } else {
          mensajeError('Error creando moneda');
        }
      });
    }
  }
}
