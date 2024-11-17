import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-endfree',
  templateUrl: './endfree.component.html',
  styleUrls: ['./endfree.component.scss'],
})
export class EndfreeComponent implements OnInit {
  viewService = inject(ViewService);
  router = inject(Router);

  mensaje: string = '';

  ngOnInit(): void {
    this.verificarSuscripcion();
  }

  verificarSuscripcion(): void {
    this.viewService.verSub().then((sub) => {
      if (sub === 'Free') {
        this.mensaje = 'Ha finalizado tu prueba gratis!';
      } else if (sub === 'Trial') {
        this.mensaje = 'Se terminó tu suscripción Trial!';
      }
    });
  }

  ChangeSub(sub: number): void {
    this.viewService.cambiarSub(sub).then((res) => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }
}
