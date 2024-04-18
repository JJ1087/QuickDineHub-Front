// admin-activacion-perfiles.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-activacion-perfiles',
  templateUrl: './admin-activacion-perfiles.component.html',
  styleUrl: './admin-activacion-perfiles.component.css'
})
export class AdminActivacionPerfilesComponent implements OnInit {
  displayedColumns: string[] = ['nombreUsuario', 'tipoPerfil', 'infoPerfil', 'fechaRegistro', 'estadoAccesoCombo'];

  // Datos para Clientes
  dataSourceClientes = [
    // Reemplazar esto con tu fuente de datos real.
    { nombreUsuario: 'Cliente1', tipoPerfil: 'Cliente', fechaRegistro: new Date(), estadoAcceso: 'Activado' },
    // Agrega más clientes
  ];

  // Datos para Repartidores
  dataSourceRepartidores = [
    // Reemplazar esto con tu fuente de datos real.
    { nombreUsuario: 'Repartidor1', tipoPerfil: 'Repartidor', fechaRegistro: new Date(), estadoAcceso: 'Activado' },
    // Agrega más repartidores
  ];

  // Datos para Restaurantes
  dataSourceRestaurantes = [
    // Reemplazar esto con tu fuente de datos real.
    { nombreUsuario: 'Restaurante1', tipoPerfil: 'Restaurante', fechaRegistro: new Date(), estadoAcceso: 'Activado' },
    // Agrega más restaurantes
  ];

  constructor() { }

  ngOnInit(): void {
  }

  cambiarEstadoAccesoCliente(cliente: any) {
    // Lógica para cambiar el estado de acceso del cliente
    console.log(`Estado de acceso cambiado para cliente: ${cliente.nombreUsuario} - ${cliente.estadoAcceso}`);
  }

  cambiarEstadoAccesoRepartidor(repartidor: any) {
    // Lógica para cambiar el estado de acceso del repartidor
    console.log(`Estado de acceso cambiado para repartidor: ${repartidor.nombreUsuario} - ${repartidor.estadoAcceso}`);
  }

  cambiarEstadoAccesoRestaurante(restaurante: any) {
    // Lógica para cambiar el estado de acceso del restaurante
    console.log(`Estado de acceso cambiado para restaurante: ${restaurante.nombreUsuario} - ${restaurante.estadoAcceso}`);
  }
}
