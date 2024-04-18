// mis-pedidos.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrl: './mis-pedidos.component.css'
})

export class MisPedidosComponent implements OnInit {

  // Lista de pedidos (ejemplo)
  detalleOrdenes: any[] = [];
  productos: any[] = [];
  ordenes: any[] = [];

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.obtenerdetalleOrdenes().subscribe((detalleOrdenes: any[]) => {
      console.log('Detalle de órdenes:', detalleOrdenes);
      this.detalleOrdenes = detalleOrdenes;

      // Extraer los ids de los productos de los detalles de órdenes y maps
      const idsProductos = detalleOrdenes.map(detalleOrden => detalleOrden.idProducto);
      const idsOrdenes = detalleOrdenes.map(detalleOrden => detalleOrden.idOrden);


      // Utilizar los ids de los productos para hacer solicitudes para obtener los datos de los productos
      idsProductos.forEach((productId, index) => {
        this.authService.obtenerInfoDeProductoPorId(productId).subscribe((producto: any) => {//Reutilizamos la funcion de inicio-cliente
          console.log('Producto:', producto);
          //this.productos.push(producto);
          this.productos[index] = producto;
        }, (error) => {
          console.error('Error al obtener el producto con ID', productId, ':', error);
        });
      });

     

      // Utilizar los ids de las órdenes para hacer solicitudes para obtener los datos de las órdenes
      idsOrdenes.forEach(ordenId => {
        this.authService.obtenerInfoDeOrdenPorId(ordenId).subscribe((orden: any) => {
          console.log('Orden:', orden);
          this.ordenes.push(orden);
        }, (error) => {
          console.error('Error al obtener la orden con ID', ordenId, ':', error);
        });
      });

    }, (error) => {
      console.error('Error al obtener los detalles de las órdenes:', error);
    });

    
  }

  
 
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
        return 'Entregado';
      default:
        return 'Cargando estado';
    }
  }

  // Función para ver detalles de compra
  verDetalles( idOrden: string, idCliente: string, idRestaurante: string, idDireccion: string, idCuentaBanco: string, nombreProducto: string, descripcionProducto: string, estadoOrden: number, createdAt: Date, costoUnidad: number ) {
    // Redireccionar a la página de detalles de compra, pasando el ID del pedido
    //this.router.navigate(['../estado-envio']);
    //console.log("IDS: ", estadoOrden);
    // Extraer el valor numérico de costoEnvio

    this.router.navigate(['../estado-envio', {idOrden, idCliente, idRestaurante, idDireccion, idCuentaBanco, nombreProducto, descripcionProducto, estadoOrden, createdAt, costoUnidad}]);
  }

}
