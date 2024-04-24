import { Component, OnInit, Input } from '@angular/core';
import { PreguntaSecretaService } from '../../services/preguntaSecreta.service';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-notificaciones-enterado',
  templateUrl: './notificaciones-enterado.component.html',
  styleUrl: './notificaciones-enterado.component.css'
})
export class NotificacionesEnteradoComponent implements OnInit{

  expanded: boolean = false;
  @Input() fechaPedido: string = '';
  @Input() idRestaurante: string = '';
  @Input() idOrden: string = '';
  @Output() actualizarOrdenes = new EventEmitter<void>();

  constructor( private PreguntaSecretaService: PreguntaSecretaService) { }

  ngOnInit(): void {
    this.obtenerRestaurante();
    
  }

  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }
  closeNotifications(): void {
    this.expanded = false;
  }

  enteradoDeCancelacion(): void {
    console.log('Entramos a eliminacion de orden completa id Detalle', this.idOrden);
    // Lógica para cancelar todo el pedido
     this.PreguntaSecretaService.eliminarOrden(this.idOrden).subscribe(
       response => {
         console.log('SE elimino con éxito:', response);
         this.actualizarOrdenes.emit();
        
       },
       error => {
         console.error('Error al eliminar la orden:', error);
         // Aquí puedes manejar errores si es necesario
       }
     );
   
  }

  //Obtener Datos de Restaurante---------------------------------------------------------------
 restaurante: any;

 obtenerRestaurante() {

   if (this.idRestaurante) {
    // Llama a la función del servicio para obtener las direcciones desde el backend
    this.PreguntaSecretaService.obtenerRestaurante(this.idRestaurante).subscribe(
      (data) => {
        this.restaurante = data;        
        console.log('Info restaurante recibido', this.restaurante);
       
      },
      (error) => {
        console.error('Error al obtener info restaurante:', error);
       
       // Maneja el error según sea necesario
      }
    );

   }else{     console.log('No se esta recibiendo el id del comensal');
   }
  }

}
