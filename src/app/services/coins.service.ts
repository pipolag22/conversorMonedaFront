import { Injectable } from '@angular/core';
import { Moneda } from '../interfaces/Moneda';
import { API } from '../constants/api';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CoinsService extends ApiService {
  async convert(
    amount: number,
    fromconvert: number,
    toconvert: number
  ): Promise<string> {
    const url = `${API}Coin/Convertir?amount=${amount}&ICfromConvert=${fromconvert}&ICtoConvert=${toconvert}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + this.auth.token(),
        },
      });

      if (!response.ok) {
        console.error('Error en la solicitud');
        return '-2';
      }

      return await response.text();
    } catch (error) {
      console.error('Error en la conversión:', error);
      return '-2';
    }
  }

  async create(moneda: Moneda): Promise<boolean> {
    if (moneda.id) return false;
    const response = await fetch(`${API}Coin/CrearMoneda`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token(),
      },
      body: JSON.stringify(moneda),
    });
    return response.ok;
  }

  async edit(leyenda: string, moneda: Moneda): Promise<boolean> {
    if (!moneda.id) return false;
    const url = `${API}Coin/EditarMoneda?CoinId=${moneda.id}&leyenda=${leyenda}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token(),
      },
      body: JSON.stringify(moneda),
    });
    return response.ok;
  }

  async delete(id: number, leyenda: string): Promise<boolean> {
    const url = `${API}Coin/EliminarMoneda?CoinId=${id}&leyenda=${leyenda}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + this.auth.token(),
      },
    });
    return response.ok;
  }

  async createFav(moneda: Moneda): Promise<boolean> {
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

  async deleteFav(id: number): Promise<boolean> {
    const url = `${API}Coin/BorrarFavorita?monedaId=${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + this.auth.token(),
      },
    });
    return response.ok;
  }

  async verMonedas(endpoint: string): Promise<Moneda[]> {
    try {
      const response = await this.getAuth(`View/VerMonedas${endpoint}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Error al obtener monedas:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error en la solicitud para ver monedas:', error);
      return [];
    }
  }
}
