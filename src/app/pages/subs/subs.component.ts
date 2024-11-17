import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-subs',
  templateUrl: './subs.component.html',
  styleUrls: ['./subs.component.scss'],
})
export class SubsComponent {
  viewService = inject(ViewService);
  router = inject(Router);

  Sub: string = '';

  ngOnInit(): void {
    this.viewService.verSub().then((res) => {
      this.Sub = res;
    });
  }

  ButtonClick(suscripcion: string, opcion: number) {
    if (this.Sub === suscripcion) {
      this.router.navigate(['/home']);
    } else {
      this.ChangeSub(opcion);
    }
  }

  ChangeSub(sub: Number) {
    this.viewService.cambiarSub(sub).then((res) => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }
  Cancelar() {
    this.router.navigate(['/home']);
  }
}
