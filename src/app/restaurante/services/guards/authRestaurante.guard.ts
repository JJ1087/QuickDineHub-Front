import { Injectable, HostListener } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MensajeComponent } from '../../../compartido/components/mensaje/mensaje.component'; // Importa el componente de mensaje


@Injectable({
  providedIn: 'root'
})


export class RestauranteGuard implements CanActivate {
  lastActivityTime: number = 0; 
  private inactivityTimer: any;
  private readonly inactivityTimeout = 3600000; // 10 minutos en milisegundos

  constructor(private router: Router, private dialog: MatDialog) {}

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.handleUserActivity();
  }
  
  @HostListener('window:keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    this.handleUserActivity();
  }

  private handleUserActivity(): void {
    this.lastActivityTime = new Date().getTime(); // Actualiza el tiempo de la última actividad
    this.resetInactivityTimer();
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (typeof localStorage !== 'undefined') {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      const expirationTimeInSeconds = Number(localStorage.getItem('EXPIRES_IN'));
      
      if (accessToken && expirationTimeInSeconds) {

       this.startInactivityTimer(); // Comienza a rastrear la inactividad del usuario
        const currentTime = new Date().getTime();
        
        if (currentTime > expirationTimeInSeconds) {
          // El token ha expirado
          console.log('El tokens ha expirado');
          // Eliminar el token de acceso y el tiempo de expiración del almacenamiento local
          localStorage.removeItem('ACCESS_TOKEN');
          localStorage.removeItem('EXPIRES_IN');
          // Mostrar mensaje de sesión expirada
          this.openMensajeDialog('Su sesión ha expirado. Por favor inicie sesión nuevamente.', 'login-restaurante');
          // Redirigir al usuario a la página de inicio de sesión
          this.router.navigate(['/login-restaurante']);
          return false; // Devuelve false para evitar la navegación
        } else {
          // El token aún no ha expirado, verificar el rol del usuario
          const tokenPayload = this.decodeToken(accessToken);
          if (tokenPayload && tokenPayload.rol === 'restaurante') {
            return true; // Permitir el acceso si el usuario está autenticado y tiene el rol de restaurante
          } else {
            // Abre el diálogo de mensaje si el usuario no tiene el rol correcto
            this.openMensajeDialog('Por favor registrese como un Comensal', 'login-restaurante');
            return false; // Devuelve false para evitar la navegación
          }
        }
      } else {
        // No hay token almacenado o el tiempo de expiración es inválido, redirigir al usuario al inicio de sesión.
        this.openMensajeDialog('Por favor inicie sesión', 'login-restaurante');
        return false; // Devuelve false para evitar la navegación
      }
    } else {
      // Manejar el caso donde localStorage no está disponible
      console.error('TOBI');
      // Podrías redirigir a una página de error o negar el acceso de alguna otra manera
      return false;
    }
  }

  private decodeToken(token: string): any {
    try {
       const base64Url = token.split('.')[1];
       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
       const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
           return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
       }).join(''));
       return JSON.parse(jsonPayload);
     } catch (error) {
       console.error('Error decoding token:', error);
       return null;
     }
   }

  private openMensajeDialog(message: string, redirectRoute: string): void {
    // Abre el componente de mensaje con el mensaje proporcionado
    this.dialog.open(MensajeComponent, {
      width: '400px',
      data: { mensaje: message, redireccion: redirectRoute }
    });
  }

// FINALIZAR SESION POR INACTIVIDAD


  private logoutDueToInactivity(): void {
    // Elimina el token de acceso y el tiempo de expiración del almacenamiento local
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
    // Muestra un mensaje de sesión expirada
    this.openMensajeDialog('Su sesión ha expirado debido a la inactividad. Por favor inicie sesión nuevamente.', 'login-restaurante');
    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login-restaurante']);
  }

  private startInactivityTimer(): void {
    this.stopInactivityTimer(); // Detén el temporizador existente si hay uno
    this.inactivityTimer = setTimeout(() => {
      // El temporizador de inactividad ha expirado
      this.logoutDueToInactivity();
    }, this.inactivityTimeout);
  }
  
  private stopInactivityTimer(): void {
    clearTimeout(this.inactivityTimer);
  }
  
  private resetInactivityTimer(): void {
    this.stopInactivityTimer();
    const currentTime = new Date().getTime();
    const timeSinceLastActivity = currentTime - this.lastActivityTime;
    if (timeSinceLastActivity >= this.inactivityTimeout) {
      // Reiniciar el temporizador solo si ha pasado suficiente tiempo desde la última actividad
      this.startInactivityTimer();
    } else {
      // Sino, ajustar el temporizador para que expire después del tiempo restante
      const remainingTime = this.inactivityTimeout - timeSinceLastActivity;
      this.inactivityTimer = setTimeout(() => {
        this.logoutDueToInactivity();
      }, remainingTime);
    }
  }
}
  