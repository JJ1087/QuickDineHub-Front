// login-repartidores.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegistroRepartidorService } from '../../services/registro-repartidor.service';
import {MensajeComponent} from '../../../compartido/components/mensaje/mensaje.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BloqueoService } from '../../services/bloqueo-cuenta.service';

@Component({
  selector: 'app-login-repartidores',
  templateUrl: './login-repartidores.component.html',
  styleUrls: ['./login-repartidores.component.css']
})
export class LoginRepartidoresComponent {

  correoRepartidor: string = '';
  contrasena: string = '';
  mostrarSegundaFase: boolean = false;
  tipoRecuperacion: string = '';
  hidePassword: boolean = true;
  intentosFallidos: number = 0;
  bloqueado: boolean = false;
  bloqueoTemporizador: any; 

  loginForm!: NgForm;
  private synth!: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null!;

  constructor(private RegistroRepartidorService: RegistroRepartidorService, private router:Router, public dialog: MatDialog, private snackBar: MatSnackBar, private bloqueoService: BloqueoService) {}
  toggleVozAlta() {
    const enableVozAlta = document.getElementById('enableVozAlta') as HTMLInputElement;
    this.synth = window.speechSynthesis;
  
    const elementos = document.querySelectorAll('a, img, h1, p, h2, .title, .option, label, button' );
  
    elementos.forEach(elemento => {
      elemento.addEventListener('mouseover', () => {
        if (enableVozAlta.checked) {
          if (this.synth.speaking && this.utterance) {
            this.synth.cancel();
          }
  
          let texto = '';
  
          // Verificar si el elemento es una imagen antes de acceder a 'alt'
          if (elemento instanceof HTMLImageElement) {
            texto = elemento.alt;
          } else if (elemento instanceof HTMLElement) {
            texto = elemento.innerText || elemento.textContent || '';
          }
  
          if (texto.trim() !== '') {
            this.utterance = new SpeechSynthesisUtterance(texto);
            this.synth.speak(this.utterance);
          }
        }
      });
    });
  }

  onSubmit(form: NgForm) {
    if (!this.bloqueado && form.valid) {
      console.log('Inicio de sesión exitoso:', form.value);
      this.RegistroRepartidorService.loginRepartidor(form.value).subscribe(
        res => {
          console.log('Respuesta del servidor:', res);
          this.router.navigateByUrl('/inicio-repartidor');
        },
        error => {
          console.error('Error en la solicitud:', error);
          this.intentosFallidos++;
          if (this.intentosFallidos >= 7) {
            this.bloquearCuentaTemporalmente();
          }
          this.mostrarMensajeEmergente('La contraseña o email son incorrectos', '');
        }
      );
    } else {
      if (this.bloqueado) {
        this.mostrarMensajeEmergente('Su cuenta está bloqueada temporalmente. Intente nuevamente más tarde.', '');
      } else {
        console.log('Por favor, asegúrese de completar todos los campos o su cuenta está bloqueada.');
      }
    }
  }

  bloquearCuentaTemporalmente() {
    this.bloqueado = true;
    let tiempoRestante = 20; // 600 segundos = 10 minutos
    const intervalo = setInterval(() => {
      tiempoRestante--;
      if (tiempoRestante <= 0) {
        clearInterval(intervalo);
        this.bloqueado = false;
        this.intentosFallidos = 0;
      }
      this.mostrarSnackBar(`Su cuenta ha sido bloqueada temporalmente debido a múltiples intentos fallidos. Intente nuevamente en ${tiempoRestante} segundos.`);
    }, 1000); // Actualizar cada segundo
  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, '', {
      duration: 3000, // Duración de la notificación en milisegundos (en este caso, 10 segundos)
      horizontalPosition: 'center', // Posición horizontal del mensaje emergente
      verticalPosition: 'bottom', // Posición vertical del mensaje emergente
      panelClass: ['mat-toolbar', 'mat-primary'] // Clase de panel personalizada para estilos adicionales
    });
  }


  mostrarMensajeEmergente(mensaje: string, redireccion: string) {
    // Abre el cuadro de diálogo con el mensaje
    console.log('Redireccion:', redireccion); 
    this.dialog.open(MensajeComponent, {
      width: '400px',
      data: { mensaje: mensaje, redireccion: redireccion }
    });
  }



  mostrarSegundaFaseRecuperacion() {
    this.mostrarSegundaFase = true;
  }

  regresarAFase1() {
    this.mostrarSegundaFase = false;
  }
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.setAttribute('type', this.hidePassword ? 'password' : 'text');
    }
  }
}
