import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { API } from '../constants/api';
import { Router } from '@angular/router';
import { LoginData, RegisterData } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    this.token.set(localStorage.getItem('token'));
  }

  router = inject(Router);
  token: WritableSignal<string | null> = signal(null);

  async login(loginData: LoginData) {
    try {
      const res = await fetch(API + 'authentication/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      if (!res.ok) return false;
      const tokenRecibido = await res.text();
      localStorage.setItem('token', tokenRecibido);
      this.token.set(tokenRecibido);
      return true;
    } catch {
      return false;
    }
  }

  async register(data: RegisterData): Promise<Response> {
    const response = await fetch(API + 'User/Registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    return response;
  }

  logOut() {
    this.token.set(null);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
