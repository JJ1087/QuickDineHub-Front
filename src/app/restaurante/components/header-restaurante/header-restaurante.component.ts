import { Component } from '@angular/core';
import { AuthrestauranteService } from '../../services/authrestaurante.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-restaurante',
  templateUrl: './header-restaurante.component.html',
  styleUrl: './header-restaurante.component.css'
})
export class HeaderRestauranteComponent {
  constructor(private authrestauranteService: AuthrestauranteService, private router: Router) { }
  logout(): void {
    this.authrestauranteService.logout(); // Llama a la función logout() del servicio AuthService
    this.router.navigate(['./']); // Redirige a la página de inicio
  }
}
