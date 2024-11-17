import { Injectable } from '@angular/core';
import { API } from '../constants/api';
import { ApiService } from './api.service';
import { Moneda } from '../interfaces/Moneda';

@Injectable({
  providedIn: 'root',
})
export class ViewService extends ApiService {
  // Cambiar suscripción
  async cambiarSub(sub: Number): Promise<boolean> {
    const url = `${API}View/CambiarSub?sub=${sub}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token(),
      },
    });
    return response.ok;
  }

  // Ver suscripción
  async verSub(): Promise<string> {
    const response = await this.getAuth('View/VerSub');
    return await response.text();
  }

  // Ver total de conversiones
  async verTotalConversiones(): Promise<string> {
    const response = await this.getAuth('View/VerTotalConversiones');
    return await response.text();
  }

  // Ver las monedas dependiendo del tipo
  async verMonedas(endpoint: string): Promise<Moneda[]> {
    const response = await this.getAuth(`View/VerMonedas${endpoint}`);
    const data = await response.json();
    return data;
  }

  // Obtener moneda por ID
  async getById(id: number): Promise<Moneda | undefined> {
    const response = await this.getAuth(`View/VerMonedaUserById?CoinId=${id}`);
    if (!response.ok) return undefined;
    const data = await response.json();
    return data;
  }

  // Obtener moneda favorita por leyenda
  async getFavByleyenda(leyenda: string): Promise<Moneda | undefined> {
    const response = await this.getAuth(
      `View/VerFavoritaByLeyenda?leyenda=${leyenda}`
    );
    if (response.status === 204 || response.status === 404) {
      return undefined;
    } else if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error al obtener la moneda favorita por leyenda');
    }
  }

  // Agregar moneda favorita
  async agregarMonedaFavorita(moneda: Moneda): Promise<boolean> {
    const response = await fetch(`${API}Coin/AgregarFavorita`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token(),
      },
      body: JSON.stringify(moneda),
    });
    return response.ok;
  }

  // Remover moneda favorita
  async removerMonedaFavorita(id: number): Promise<boolean> {
    const url = `${API}Coin/BorrarFavorita?monedaId=${id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + this.auth.token(),
        },
      });
      return response.ok;
    } catch (error) {
      console.error('Error en la llamada al backend: ', error);
      return false;
    }
  }

  // Verificar si una moneda es favorita por leyenda
  async verificarFavorito(leyenda: string): Promise<boolean> {
    const url = `${API}View/VerFavoritaByLeyenda?leyenda=${leyenda}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.auth.token(),
      },
    });

    if (response.ok) {
      return true;
    } else if (response.status === 404) {
      return false;
    } else {
      throw new Error('Error al verificar la moneda');
    }
  }
}
