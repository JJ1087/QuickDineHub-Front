import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MensajeComponent } from '../../../compartido/components/mensaje/mensaje.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-clientes',
  templateUrl: './login-clientes.component.html',
  styleUrls: ['./login-clientes.component.css']
})

export class LoginClientesComponent implements OnInit{

  loginForm!: FormGroup;
  hidePassword: boolean = true;
  mostrarSegundaFase: boolean = false;
  intentosFallidos: number = 0;
  bloqueado: boolean = false;
  bloqueoTemporizador: any; 
  constructor(private authService: AuthService, public dialog: MatDialog, private router: Router,  private formBuilder: FormBuilder, private snackBar: MatSnackBar){}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.setAttribute('type', this.hidePassword ? 'password' : 'text');
    }
  }

  async OnLogin(): Promise<void> {
    if (!this.bloqueado && this.loginForm.valid) {
      try {
     
        const res = await this.authService.login(this.loginForm.getRawValue()).toPromise();
        
        if (res.dataUser) {
          // Usuario autenticado correctamente, redirige al inicio
          this.router.navigateByUrl('/inicio-cliente');

        }
      } catch (error: any) { // <--- Declarar el tipo de error como "any"
        console.error('Error en la solicitud:', error);
        if (error.error && error.error.message === 'EXISTE USUARIO: CONTRASEÑA INCORRECTA') {
        this.intentosFallidos++;
        this.mostrarMensajeEmergente('La contraseña es incorrecta', '');
        if (this.intentosFallidos >= 3) {
            this.bloquearCuentaTemporalmente();
        }
      // Recibimos el email del usuario existente
      const userEmail = error.error.datoUser.email;
      console.log('Correo del usuario:', userEmail);
    } else {
      // Maneja otros errores
      this.mostrarMensajeEmergente('La contraseña o email son incorrectos', '');
    }
  }
} else {
  if (this.bloqueado) {
    this.mostrarMensajeEmergente('Su cuenta está bloqueada temporalmente. Intente nuevamente más tarde.', '');
  } else {
    this.mostrarMensajeEmergente('Por favor llene los campos de forma correcta.', '');
  }
}
}


  bloquearCuentaTemporalmente() {
    this.bloqueado = true;
    let tiempoRestante = 10; // 600 segundos = 10 minutos
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



