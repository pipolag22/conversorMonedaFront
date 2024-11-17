import {
  Component,
  WritableSignal,
  inject,
  signal,
  computed,
} from '@angular/core';
import { Router } from '@angular/router';
import { RegisterData } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { mensajeError, mensajeOkey } from 'src/app/helpers/mensajes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  errorRegister: WritableSignal<boolean> = signal(false);

  registerData: RegisterData = {
    nombre: '',
    apellido: '',
    email: '',
    contrasenia: '',
  };

  private _confirmPassword: WritableSignal<string> = signal('');
  get confirmPassword(): string {
    return this._confirmPassword();
  }
  set confirmPassword(value: string) {
    this._confirmPassword.set(value);
  }

  passwordMismatch = computed(
    () => this.registerData.contrasenia !== this.confirmPassword
  );

  async register() {
    this.errorRegister.set(false);

    if (this.passwordMismatch()) {
      mensajeError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const res = await this.authService.register(this.registerData);
      if (res.ok) {
        mensajeOkey('Tu cuenta ha sido creada correctamente.');
        this.router.navigate(['/login']);
      } else if (res.status === 409) {
        mensajeError('El correo proporcionado ya está en uso.');
      } else {
        this.errorRegister.set(true);
        mensajeError(
          'Ocurrió un error al crear la cuenta. Intenta nuevamente.'
        );
      }
    } catch (err) {
      console.warn('Error registrando', err);
      this.errorRegister.set(true);
      mensajeError(
        'No se pudo completar el registro. Revisa tu conexión o intenta más tarde.'
      );
    }
  }
}
