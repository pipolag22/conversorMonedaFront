import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Moneda } from 'src/app/interfaces/Moneda';
import { AuthService } from 'src/app/services/auth.service';
import { CoinsService } from 'src/app/services/coins.service';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  viewService: ViewService;
  coinsService: CoinsService;
  router: Router;
  auth: AuthService;

  MostrarSub: string = '';
  MostrarConversiones: string = '';
  MonedasFavoritas: Moneda[] = [];
  MonedasUsuario: Moneda[] = [];
  MonedasDefault: Moneda[] = [];

  inputValue: number = 0;
  resultado: number = 0;
  isDropdownOpen1: boolean = false;
  isDropdownOpen2: boolean = false;
  selectedOption1: string = 'Moneda 1';
  selectedOption2: string = 'Moneda 2';
  ICfromConvert: number = 0;
  ICtoConvert: number = 0;

  constructor(
    viewService: ViewService,
    coinsService: CoinsService,
    router: Router,
    auth: AuthService
  ) {
    this.viewService = viewService;
    this.coinsService = coinsService;
    this.router = router;
    this.auth = auth;
  }

  ngOnInit(): void {
    this.viewService.verSub().then((res) => {
      this.MostrarSub = res;
    });
    this.verTotalConversionesHome();

    this.viewService.verMonedas('Favoritas').then((res) => {
      this.MonedasFavoritas = res;
    });
    this.viewService.verMonedas('Usuario').then((res) => {
      this.MonedasUsuario = res;
    });
    this.viewService.verMonedas('Default').then((res) => {
      this.MonedasDefault = res;
    });
  }

  verTotalConversionesHome() {
    this.viewService.verTotalConversiones().then((res) => {
      if (parseInt(res) < 0) {
        this.MostrarConversiones = 'ilimitadas';
      } else {
        this.MostrarConversiones = res;
      }
    });
  }

  updateValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue = parseFloat(value);
  }

  toggleDropdown1(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen1 = !this.isDropdownOpen1;
    if (this.isDropdownOpen1) {
      this.isDropdownOpen2 = false;
    }
  }

  toggleDropdown2(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen2 = !this.isDropdownOpen2;
    if (this.isDropdownOpen2) {
      this.isDropdownOpen1 = false;
    }
  }

  selectOption1(monedaselect: Moneda, event: Event) {
    event.stopPropagation();
    this.selectedOption1 = monedaselect.simbolo;
    this.ICfromConvert = monedaselect.ic;
    this.isDropdownOpen1 = false;
  }

  selectOption2(monedaselect: Moneda, event: Event) {
    event.stopPropagation();
    this.selectedOption2 = monedaselect.simbolo;
    this.ICtoConvert = monedaselect.ic;
    this.isDropdownOpen2 = false;
  }

  closeDropdowns() {
    this.isDropdownOpen1 = false;
    this.isDropdownOpen2 = false;
  }

  async Convertir(amount: number, ICfromConvert: number, ICtoConvert: number) {
    const res = await this.coinsService.convert(
      amount,
      ICfromConvert,
      ICtoConvert
    );
    const resultNumber = parseFloat(res);
    if (resultNumber == -1) {
      this.router.navigate(['/endfree']);
    } else if (resultNumber == -2) {
      this.router.navigate(['/home']);
    } else {
      this.resultado = parseFloat(resultNumber.toFixed(3));
      this.verTotalConversionesHome();
    }
  }

  Logout() {
    this.auth.logOut();
  }
}
