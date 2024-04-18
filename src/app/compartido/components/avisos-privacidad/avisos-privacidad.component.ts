import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-avisos-privacidad',
  templateUrl: './avisos-privacidad.component.html',
  styleUrls: ['./avisos-privacidad.component.css']
})
export class AvisosPrivacidadComponent {
  @Output() cerrarAvisoEvent = new EventEmitter<void>();

  // Cambia la función cerrarAviso() a cerrarAvisosPrivacidad()
cerrarAvisosPrivacidad() {
  this.cerrarAvisoEvent.emit();
}
  
}
