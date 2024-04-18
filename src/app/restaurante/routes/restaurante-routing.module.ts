// src/app/restaurante/restaurante-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRestauranteComponent } from '../components/login-restaurante/login-restaurante.component';
import { InicioRestauranteComponent } from '../components/inicio-restaurante/inicio-restaurante.component';
import { VentasRestauranteComponent } from '../components/ventas-restaurante/ventas-restaurante.component';
import { RestProductosComponent } from '../components/rest-productos/rest-productos.component';
import { RestPedidosComponent } from '../components/rest-pedidos/rest-pedidos.component';
import { RegistroRestauranteComponent } from '../components/registro-restaurante/registro-restaurante.component';

const routes: Routes = [

  {path: 'login-restaurante', component: LoginRestauranteComponent },
  {path: 'inicio-restaurante', component: InicioRestauranteComponent },
  {path: 'ventas-restaurante', component: VentasRestauranteComponent },
  { path: 'rest-productos', component: RestProductosComponent },
  { path: 'rest-pedidos', component: RestPedidosComponent },
  { path: 'registro-restaurante', component: RegistroRestauranteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestauranteRoutingModule { }
