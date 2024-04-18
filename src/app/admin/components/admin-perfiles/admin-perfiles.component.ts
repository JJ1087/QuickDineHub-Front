import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-perfiles',
  templateUrl: './admin-perfiles.component.html',
  styleUrl: './admin-perfiles.component.css'
})
export class AdminPerfilesComponent implements OnInit {
  displayedColumns: string[] = ['nombreUsuario', 'tipoPerfil', 'infoPerfil', 'fechaRegistro', 'estadoAcceso', 'acciones'];
  @ViewChild('rechazarDialog') rechazarDialog!: TemplateRef<any>;

  // Datos para Repartidores
  dataSourceRepartidores = [
    // Reemplazar esto con tu fuente de datos real.
    { nombreUsuario: 'Repartidor1', tipoPerfil: 'Repartidor', fechaRegistro: new Date(), estadoAcceso: 'En Espera' },
    // Agrega más repartidores
  ];

  // Datos para Restaurantes
  dataSourceRestaurantes = [
    // Reemplazar esto con tu fuente de datos real.
    { nombreUsuario: 'Restaurante1', tipoPerfil: 'Restaurante', fechaRegistro: new Date(), estadoAcceso: 'En espera' },
    // Agrega más restaurantes
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // Método para abrir la ventana emergente al rechazar un repartidor
  rechazarRepartidor(element: any) {
    const dialogRef = this.dialog.open(this.rechazarDialog, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes realizar la acción correspondiente al rechazo
      }
    });
  }
aceptarRepartidor(repartidor: any) {
    // Lógica para aceptar al repartidor
    console.log(`Repartidor aceptado: ${repartidor.nombreUsuario}`);
  }

  aceptarRestaurante(restaurante: any) {
    // Lógica para aceptar al restaurante
    console.log(`Restaurante aceptado: ${restaurante.nombreUsuario}`);
  }

  rechazarRestaurante(element: any) {
    const dialogRef = this.dialog.open(this.rechazarDialog, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes realizar la acción correspondiente al rechazo
      }
    });
  }

}

