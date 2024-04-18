import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  expanded: boolean = false;
  nombreProducto: string = ''; 
  fechaPedido: string = ''; // Variable para almacenar

  constructor() { }

  ngOnInit(): void {
    // Supongamos que recibes el nombre del producto y la fecha del pedido del backend
    this.nombreProducto = 'Tacooosss'; // lo que venga del back
    this.fechaPedido = '02-04-2024'; // ""
  }

  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }
  closeNotifications(): void {
    this.expanded = false;
  }

  procederCompra(): void {
    // Lógica para proceder con la compra sin el producto cancelado
  }

  cancelarPedido(): void {
    // Lógica para cancelar todo el pedido
  }
}
