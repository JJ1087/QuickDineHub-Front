import { Component } from '@angular/core';

@Component({
  selector: 'app-info-registro-repartidor',
  templateUrl: './info-registro-repartidor.component.html',
  styleUrl: './info-registro-repartidor.component.css'
})
export class InfoRegistroRepartidorComponent {
  tipoVehiculo: string = ''; // Variable para almacenar el tipo de vehículo seleccionado

  constructor() { }

  // Método para cambiar el tipo de vehículo
  cambiarTipoVehiculo(tipo: string) {
    this.tipoVehiculo = tipo;
  }
}
