import { Component, OnInit, Input } from '@angular/core';
import { PreguntaSecretaService } from '../../services/preguntaSecreta.service';
import { EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  expanded: boolean = false;
  @Input() nombreProducto: string = ''; 
   @Input() fechaPedido: string = ''; // Variable para almacenar
   formattedFechaPedido: string = ''; 
   @Input() idOrden: string = '';
   @Input() idCliente: string = ''; 
  @Input() noProductos: number = 0; 
  @Input() idDetalle: string = ''; 
  // Evento que permite refrescar las notificaciones en "inicio-cliente"
  @Output() actualizarOrdenes = new EventEmitter<void>();


  constructor( private PreguntaSecretaService: PreguntaSecretaService) { }

  ngOnInit(): void {
    // Convertir la cadena de fecha en un objeto de fecha
    const fecha = new Date(this.fechaPedido);

    // Formatear la fecha según tus necesidades
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' } as const;
    this.formattedFechaPedido = fecha.toLocaleDateString('es-MX', options);
  }

  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }
  closeNotifications(): void {
    this.expanded = false;
  }

  procederCompra(): void {

    console.log('numero de productos', this.noProductos);

    if(this.noProductos === 2){

        console.log('Eliminamod un producto de la orden');
        // Llamar al servicio para actualizar el estado de la orden
      this.PreguntaSecretaService.actualizarEstadoOrden(this.idOrden, this.idDetalle).subscribe(
        response => {
          console.log('Estado de la orden actualizado con éxito:', response);
          // Aquí podrías agregar lógica adicional si necesitas manejar la respuesta del servidor
          const transactionType = "Usuario decide continuar con la compra" ;
          this.logDeTransacciones1(transactionType, this.idOrden);

          this.actualizarOrdenes.emit();
          
        },
        error => {
          console.error('Error al actualizar el estado de la orden:', error);
          // Aquí puedes manejar errores si es necesario
        }
      );

    }else{
      this.cancelarPedido();
    }

    
  
  }

  logDeTransacciones1(transactionType: string, orderId: string): void {
    this.PreguntaSecretaService.logDeTransacciones(transactionType, orderId, this.idCliente).subscribe(
      () => {
        console.log('Transacción de pedido realizada registrada correctamente en el backend');
      },
      (error) => {
        console.error('Error al registrar la transacción de pedido realizado:', error);
      }
    );
  }

  cancelarPedido(): void {
    console.log('Entramos a eliminacion de orden completa id Detalle', this.idDetalle);
    // Lógica para cancelar todo el pedido
     this.PreguntaSecretaService.eliminarOrden(this.idOrden).subscribe(
       response => {
         console.log('SE elimino con éxito:', response);
         // Aquí podrías agregar lógica adicional si necesitas manejar la respuesta del servidor
         //this.logDeTransacciones1(this.idOrden);
         this.actualizarOrdenes.emit();
        
       },
       error => {
         console.error('Error al eliminar la orden:', error);
         // Aquí puedes manejar errores si es necesario
       }
     );
   }
}
