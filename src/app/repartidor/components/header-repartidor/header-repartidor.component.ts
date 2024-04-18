import { Component } from '@angular/core';
import { Router} from '@angular/router'
import { RegistroRepartidorService } from '../../services/registro-repartidor.service';

@Component({
  selector: 'app-header-repartidor',
  templateUrl: './header-repartidor.component.html',
  styleUrl: './header-repartidor.component.css'
})
export class HeaderRepartidorComponent {
  constructor(private RegistroRepartidorService: RegistroRepartidorService, private router: Router) { }

  logout(): void {
    this.router.navigate(['./']);
    this.RegistroRepartidorService.logout(); // Llama a la función logout() del servicio AuthService

  }
}
