import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Console } from 'console';

@Component({
  selector: 'app-estado-envio',
  templateUrl: './estado-envio.component.html',
  styleUrl: './estado-envio.component.css'
})

export class EstadoEnvioComponent implements OnInit {

 
  

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  detalleId: string='';

  ngOnInit(): void {
    // Obtén el ID del detalleOrden de la URL
    this.route.params.subscribe(params => {
      this.detalleId = params['id']; // El 'id' corresponde al parámetro definido en la ruta
      console.log('ID del detalleOrden:', this.detalleId); 

      this.obtenerDetalleOrdenid(this.detalleId);
    });
  }


//comenzaremos trallendo los datos de el detalle orden---------------------------------------

detalleOrdenes: { [idDetalle: string]: any } = {};
costoUnidad: number=0;


obtenerDetalleOrdenid(detalleId: string) {
  // Utiliza el ID del detalle de orden para obtener la información de la orden
  this.authService.obtenerdetalleOrdenesPorId(detalleId).subscribe((orden: any) => {
    // Verifica si la orden existe
    if (orden) {
      // Itera sobre cada detalle de orden correspondiente a la orden

      
      this.detalleOrdenes[detalleId] = orden;
      console.log('DATOS DE ORDEN', this.detalleOrdenes); 

       this.costoUnidad = Number(this.detalleOrdenes[detalleId]?.costoUnidad.$numberDecimal); 
      

      console.log("YA CASIIIIII: ", this.costoEnvio);
      console.log("YA CASIIIIII: ", this.precioTotal);

      console.log('DETALLE DE ORDEN GUARDADO:', this.costoUnidad); 

      this.obtenerOrdenPorId(this.detalleOrdenes[detalleId]. idOrden);

      


    } else {
      console.error('No se encontró la orden con ID', detalleId);
    }
  }, (error) => {
    console.error('Error al obtener la orden con ID', detalleId, ':', error);
  });
}


//ahora vamos a obtener con el idorden de detalle orden la info de la Orden----------------------
ordenGeneral: any;
costoEnvio: number=0;
precioTotal: number=0;
obtenerOrdenPorId(detalleId: string) {
  // Utiliza el ID del detalle de orden para obtener la información de la orden
  this.authService.obtenerInfoDeOrdenPorId(detalleId).subscribe(
    (orden: any) => {
      // Verifica si la orden existe
      if (orden) {
        // Llama a la función para procesar la orden
        this.ordenGeneral = orden;
        console.log('Datos de la orden:', this.ordenGeneral);

      this.costoEnvio = Number(this.ordenGeneral.costoEnvio.$numberDecimal); 
      this.precioTotal = Number(this.ordenGeneral.precioTotal.$numberDecimal); 

        this.obtenerRestaurante(this.ordenGeneral.idRestaurante);
        this.obtenerDirecciones(this.ordenGeneral.idDireccion);
        this.obtenerDatoComensal(this.ordenGeneral.idCliente);
        this.obtenercuentaBancoId(this.ordenGeneral.idCuentaBanco);
        
        
        
      } else {
        console.error('No se encontró la orden con ID', detalleId);
      }
    },
    (error) => {
      console.error('Error al obtener la orden con ID', detalleId, ':', error);
    }
  );
}


//---Generar estados--------------------------------------------------
 
 // Método para obtener el estado legible de la orden
 obtenerEstado(estadoOrden: number): string {

  switch (estadoOrden) {
    case 0:
        return 'Pedido en espera de ser aceptado por el restaurante';
      case 1:
        return 'Orden rechazada';//Mensaje de enterado, cuando de aceptar eliminar los detalles de la orden cancelada
      case 2:
        return '¿Desea continuar con la compra?';//Mensaje de que alimento se quito,si rechaza eliminar orden completa, si no solo eliminar un detalle de orden
      case 3:
        return 'Pedido en espera de ser aceptado por el restaurante';
      case 4:
        return 'En preparación';
      case 5:
        return 'Esperando repartidor';
      case 6:
        return 'Salio de cocina, en camino';
      case 7:
        return 'Confirmar entrega';//Alarma para finalizar pedido
      case 8:
        return 'Pedido cancelado';
      case 9:
        return 'Entregado';
      default:
        return 'Cargando estado';
  }
}

//ahora vamos a obtener con el idorden de detalle orden la info de la Orden----------------------
Restaurante: any;
obtenerRestaurante(detalleId: string) {
  // Utiliza el ID del detalle de orden para obtener la información de la orden
  this.authService.obtenerRestaurante(detalleId).subscribe(
    (orden: any) => {
      // Verifica si la orden existe
      if (orden) {
        // Llama a la función para procesar la orden
        this.Restaurante = orden;
        console.log('Datos de la orden:', this.Restaurante);
        
      } else {
        console.error('No se encontró la orden con ID', detalleId);
      }
    },
    (error) => {
      console.error('Error al obtener la orden con ID', detalleId, ':', error);
    }
  );
}

//ahora vamos a obtener con el idorden de detalle orden la info de la Orden----------------------
direccion: any;
obtenerDirecciones(detalleId: string) {
  // Utiliza el ID del detalle de orden para obtener la información de la orden
  this.authService.obtenerDirecciones2(detalleId).subscribe(
    (orden: any) => {
      // Verifica si la orden existe
      if (orden) {
        // Llama a la función para procesar la orden
        this.direccion = orden;
        console.log('Datos de la orden:', this.direccion);
        
      } else {
        console.error('No se encontró la orden con ID', detalleId);
      }
    },
    (error) => {
      console.error('Error al obtener la orden con ID', detalleId, ':', error);
    }
  );
}

//ahora vamos a obtener con el idorden de detalle orden la info de la Orden----------------------
cliente: any;
obtenerDatoComensal(detalleId: string) {
  // Utiliza el ID del detalle de orden para obtener la información de la orden
  this.authService.obtenerDatoComensal(detalleId).subscribe(
    (orden: any) => {
      // Verifica si la orden existe
      if (orden) {
        // Llama a la función para procesar la orden
        this.cliente = orden;
        console.log('Datos de la orden:', this.cliente);
        
      } else {
        console.error('No se encontró la orden con ID', detalleId);
      }
    },
    (error) => {
      console.error('Error al obtener la orden con ID', detalleId, ':', error);
    }
  );
}

//ahora vamos a obtener con el idorden de detalle orden la info de la Orden----------------------
cuenta: any;
obtenercuentaBancoId(detalleId: string) {
  // Utiliza el ID del detalle de orden para obtener la información de la orden
  this.authService.obtenercuentaBancoId(detalleId).subscribe(
    (orden: any) => {
      // Verifica si la orden existe
      if (orden) {
        // Llama a la función para procesar la orden
        this.cuenta = orden;
        console.log('Datos de la orden:', this.cuenta);
        
      } else {
        console.error('No se encontró la orden con ID', detalleId);
      }
    },
    (error) => {
      console.error('Error al obtener la orden con ID', detalleId, ':', error);
    }
  );
}
  
}