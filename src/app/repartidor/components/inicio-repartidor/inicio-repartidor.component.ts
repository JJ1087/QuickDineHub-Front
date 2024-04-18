import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio-repartidor',
  templateUrl: './inicio-repartidor.component.html',
  styleUrl: './inicio-repartidor.component.css'
})
export class InicioRepartidorComponent {
  nombreUsuario: string|null=null;

  ngOnInit(){

    this.nombreUsuario = localStorage.getItem ('REPARTIDOR_NAME');
    // Puedes cambiar el valor por el nombre del usuario actual
  }

}
