import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthrestauranteService } from '../../services/authrestaurante.service';
import { MatDialog } from '@angular/material/dialog';
import { MensajeComponent } from '../../../compartido/components/mensaje/mensaje.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-restaurante',
  templateUrl: './login-restaurante.component.html',
  styleUrls: ['./login-restaurante.component.css']
})
export class LoginRestauranteComponent {
  loginForm!: FormGroup;
  hidePassword: boolean = true;
  private synth!: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null!;
  mostrarSegundaFase: boolean = false;
  intentosFallidos: number = 0;
  bloqueado: boolean = false;
  bloqueoTemporizador: any;

  constructor(private authrestaurantService: AuthrestauranteService, public dialog: MatDialog, private router: Router,  private formBuilder: FormBuilder, private snackBar: MatSnackBar){}
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      nombreRestaurante: ['', Validators.required],
      correoRestaurante: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });

  }

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
 
  login(): void {
    if (!this.bloqueado && this.loginForm.valid) {
      console.log('Datos del formulario:', this.loginForm.getRawValue());

      this.authrestaurantService.loginRestaurante(this.loginForm.getRawValue()).subscribe(
        res => {
          console.log('Respuesta del servidor:', res);
          this.router.navigateByUrl('/inicio-restaurante');
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
        this.mostrarMensajeEmergente('Por favor llene los campos de forma correcta', '');
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

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.setAttribute('type', this.hidePassword ? 'password' : 'text');
    }
  }
  private mostrarMensajeEmergente(mensaje: string, redireccion: string) {
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
}

