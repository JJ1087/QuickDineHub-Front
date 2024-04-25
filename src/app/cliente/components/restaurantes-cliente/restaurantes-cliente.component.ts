import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-restaurantes-cliente',
  templateUrl: './restaurantes-cliente.component.html',
  styleUrl: './restaurantes-cliente.component.css'
})
export class RestaurantesClienteComponent {
  restaurantes: any[] = []; // Array para almacenar los restaurantes
  nombresRestaurantes: string[] = [];
  
  constructor(private authService: AuthService) { } // Inyecta el servicio de restaurante

  ngOnInit(): void {
    this.obtenerRestaurantes();
  }

  obtenerRestaurantes(): void {
    this.authService.obtenerNombresRestaurantes().subscribe(
      (data: any[]) => {
        this.restaurantes = data;
        console.log('RES:',data )
      },
      (error) => {
        console.error('Error al obtener los restaurantes:', error);
      }
    );
  }
  formatTime(time: string): string {
    const parts = time.split(':');
    const hour = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const suffix = hour >= 12 ? 'pm' : 'am';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${minutes < 10 ? '0' + minutes : minutes} ${suffix}`;
  }

   // Método para generar la URL completa de la imagen
   getImageUrl(relativePath: string): string {
    return `http://localhost:3000/${relativePath}`;
  }
//------------------------------------------------------------------------------------------

}

