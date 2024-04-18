import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MensajeComponent } from '../../../compartido/components/mensaje/mensaje.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';  // Importa el Router
import { RegistroRepartidorService } from '../../../repartidor/services/registro-repartidor.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrl: './registro-cliente.component.css'
})

export class RegistroClienteComponent {
  registroForm: FormGroup;
  showPassword: boolean = false;
  private synth!: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null!;
  isCaptchaVerified: boolean = false;
  recaptchaSiteKey: string = '6Le6alYpAAAAAHIWXN8HgHQ19z60gq0e3YCSz5qY';
  mostrarModalAvisosPrivacidad: boolean = false; // Variable para mostrar/ocultar el modal

  faseActual: number = 1; // Definir la propiedad faseActual y asignarle un valor
  fase1Form!: FormGroup; // Debes definir el FormGroup para el formulario
  fase2Form!: FormGroup;
  public codigo: string = '';
  
  constructor(private fb: FormBuilder, private router: Router,public dialog: MatDialog, private registroService: RegistroRepartidorService, private authService: AuthService) {
    this.registroForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      fechaNacimiento: ['', [Validators.required]],//Validators.min(18)
      preguntaSecreta: ['', Validators.required], // Agrega la pregunta secreta al formulario
      respuestaSecreta: ['', Validators.required], // Agrega la respuesta secreta al formulario
      aceptarPrivacidad: [false, Validators.requiredTrue],
    });
  

    this.fase2Form = this.fb.group({
      claveAutenticacion: ['', Validators.required] // Definir los controles del formulario
    });
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getPromptLabel(): string {
    return 'La contraseña debe tener entre 8 a 16 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial (@, $, !, %, *, ?, &)';
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
  generarCodigoYEnviarCorreo() {
    const email = this.registroForm.get('correo')?.value;
    this.codigo = this.generateAuthenticationCode();

    // Envía el código por correo electrónico
    this.registroService.enviarCorreoAutenticacion(email, this.codigo)
      .subscribe(
        () => {
          console.log('Correo electrónico enviado exitosamente');
          // Aquí puedes realizar alguna acción adicional si es necesario
        },
        error => {
          console.error('Error al enviar el correo electrónico:', error);
        }
      );
  }

  generateAuthenticationCode(): string {
    const length = 6; // Longitud del código de autenticación
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Caracteres permitidos
    let code = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
  
    return code;
    }

  registrar() {
    // Validar si el formulario es válido antes de redirigir
    if (this.registroForm.valid && this.isCaptchaVerified) {

      // Lógica para registrar al usuario aquí
      //console.log('Usuario registrado:', this.registroForm.value);
      //this.mostrarMensajeEmergente();
      this.faseActual = 2;
      this.generarCodigoYEnviarCorreo();
      // Redirigir al usuario a la ventana de login-cliente
      //this.router.navigate(['/login-clientes']);
    }
    
  }
 
  handleCaptchaChange(value: string | null) {
    this.isCaptchaVerified = value !== null;
  }
  
  onFase2Submit(): void {
    const codigoIngresado = this.fase2Form.get('claveAutenticacion')?.value;
    const codigoEnviado = this.codigo;
    if (codigoIngresado === codigoEnviado) {

      const Comensales = {
      nombreCompleto: this.registroForm.get('nombreCompleto')?.value,
      correo: this.registroForm.get('correo')?.value,
      contrasena: this.registroForm.get('contrasena')?.value,
      telefono: this.registroForm.get('telefono')?.value,
      fechaNacimiento: this.registroForm.get('fechaNacimiento')?.value,
      preguntaSecreta: this.registroForm.get('preguntaSecreta')?.value,
      respuestaSecreta: this.registroForm.get('respuestaSecreta')?.value,
        }

      this.authService.Registro(Comensales).subscribe(
        (response) => {
          this.mostrarMensajeEmergente2();
          this.router.navigate(['/login-clientes']);
        },
        (error:any) => {
          console.error('Error en el registro:', error);
          // Manejar el error según sea necesario
          if(error.status === 409){
            this.mostrarMensajeEmergente('Este correo ya está registrado en el sistema. Inicia sesión o utiliza un correo electrónico diferente Carnal.', '');
          } else {
            this.mostrarMensajeEmergente('Error en la solicitud: ' + error.message, '');
          }
        }
      );
      

    } else {
      // Manejar el caso cuando el formulario no es válido
      console.log('El formulario no es válido');
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
  private mostrarMensajeEmergente2() {
    this.dialog.open(MensajeComponent, {
      width: '400px',
      data: { mensaje: 'USUARIO CREADO EXITOSAMENTE!!!' }
    });
  }
  mostrarAvisosPrivacidad() {
    // Muestra el modal de AvisosPrivacidadComponent solo si aún no está visible
    if (!this.mostrarModalAvisosPrivacidad) {
      this.mostrarModalAvisosPrivacidad = true;
    }
  }
  
  cerrarAvisosPrivacidad() {
    // Cierra el modal de AvisosPrivacidadComponent
    this.mostrarModalAvisosPrivacidad = false;
  }

    volverAFase1(): void {
      this.faseActual = 1;
    }

    getErrorMessage(controlName: string): string {
      const control = this.registroForm.get(controlName);
  
      if (control?.hasError('required')) {
        return 'Campo obligatorio';
      }
      return '';
    }

}

