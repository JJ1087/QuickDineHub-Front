import { Component, OnInit, Input } from '@angular/core';
import { PreguntaSecretaService } from '../../services/preguntaSecreta.service';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-notificaciones-entregado',
  templateUrl: './notificaciones-entregado.component.html',
  styleUrl: './notificaciones-entregado.component.css'
})
export class NotificacionesEntregadoComponent implements OnInit{

  expanded: boolean = false;
  //@Input() fechaPedido: string = '';
  //@Input() idRestaurante: string = '';
  @Input() idOrden: string = '';
  @Output() actualizarOrdenes = new EventEmitter<void>();

  constructor( private PreguntaSecretaService: PreguntaSecretaService) { }

  ngOnInit(): void {
    
  }

  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }
  closeNotifications(): void {
    this.expanded = false;
  }

  Entregado(): void {

    this.PreguntaSecretaService.actualizarEstadoOrden2(this.idOrden).subscribe( 
      response => {
        console.log('Estado de la orden actualizado con éxito:', response);
        this.actualizarOrdenes.emit();
        
      },
      error => {
        console.error('Error al actualizar el estado de la orden:', error);
        // Aquí puedes manejar errores si es necesario
      }
    );
   
  }





}
