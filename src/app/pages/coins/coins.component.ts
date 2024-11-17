import {
  Component,
  inject,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Moneda } from 'src/app/interfaces/Moneda';
import { ViewService } from 'src/app/services/view.service';
import { CoinsService } from 'src/app/services/coins.service';
import { AuthService } from 'src/app/services/auth.service';
import { mensajeError, mensajeOkey } from 'src/app/helpers/mensajes';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss'],
})
export class CoinsComponent {
  viewService = inject(ViewService);
  coinsService = inject(CoinsService);
  authService = inject(AuthService);
  changeDetector = inject(ChangeDetectorRef);

  MonedasFavoritas: Moneda[] = [];
  MonedasUsuario: Moneda[] = [];
  MonedasDefault: Moneda[] = [];
  selectedMoneda: Moneda | null = null;
  isEditMode = false;
  MostrarSub: string = '';

  @ViewChild('dialogCreateCoin', { static: false })
  dialogCreateCoin!: ElementRef<HTMLDialogElement>;

  ngOnInit(): void {
    this.actualizarEstado();

    this.viewService.verSub().then((sub) => {
      this.MostrarSub = sub;
      this.changeDetector.detectChanges();
    });
  }

  actualizarEstado(): void {
    this.cargarMonedas();
  }

  cargarMonedas(): void {
    this.viewService.verMonedas('Favoritas').then((monedasFavoritas) => {
      this.MonedasFavoritas = monedasFavoritas;
      this.changeDetector.detectChanges();
    });
    this.viewService.verMonedas('Usuario').then((monedasUsuario) => {
      this.MonedasUsuario = monedasUsuario;
      this.changeDetector.detectChanges();
    });
    this.viewService.verMonedas('Default').then((monedasDefault) => {
      this.MonedasDefault = monedasDefault;
      this.changeDetector.detectChanges();
    });
  }

  isFavorite(moneda: Moneda): boolean {
    return this.MonedasFavoritas.some((fav) => fav.id === moneda.id);
  }

  toggleFavorite(moneda: Moneda): void {
    this.viewService.verificarFavorito(moneda.leyenda).then(
      (isFavorite) => {
        if (isFavorite) {
          mensajeError('Esta moneda ya está en tus favoritos');
        } else {
          this.addFavorite(moneda);
        }
      },
      (err) => {
        mensajeError('Error al verificar la moneda');
      }
    );
  }

  addFavorite(moneda: Moneda): void {
    this.viewService.agregarMonedaFavorita(moneda).then((success) => {
      if (success) {
        mensajeOkey('Moneda añadida a favoritos');
        this.actualizarEstado();
      } else {
        mensajeError('Error al añadir la moneda a favoritos');
      }
    });
  }

  addNewMoneda(moneda: Moneda): void {
    this.coinsService.create(moneda).then((success) => {
      if (success) {
        mensajeOkey('Moneda creada exitosamente');
        this.actualizarEstado();
      } else {
        mensajeError('Error al crear la moneda');
      }
    });
  }

  removeFavorite(moneda: Moneda): void {
    this.viewService.removerMonedaFavorita(moneda.id).then((success) => {
      if (success) {
        mensajeOkey('Moneda removida de favoritos');
        this.actualizarEstado();
      } else {
        mensajeError('Error al remover la moneda de favoritos');
      }
    });
  }

  deleteMonedaUsuario(moneda: Moneda): void {
    this.coinsService.delete(moneda.id, moneda.leyenda).then((success) => {
      if (success) {
        mensajeOkey('Moneda eliminada exitosamente');
        this.actualizarEstado();
      } else {
        mensajeError('Error al eliminar la moneda');
      }
    });
  }

  openCreateDialog(): void {
    this.selectedMoneda = { id: 0, leyenda: '', simbolo: '', ic: 0 };
    this.isEditMode = false;
    this.dialogCreateCoin.nativeElement.showModal();
  }

  openEditDialog(moneda: Moneda): void {
    this.selectedMoneda = { ...moneda };
    this.isEditMode = true;
    this.dialogCreateCoin.nativeElement.showModal();
  }

  closeDialog(): void {
    this.dialogCreateCoin.nativeElement.close();
    this.selectedMoneda = null;
    this.isEditMode = false;
  }
}
