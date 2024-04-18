// src/app/repartidor/repartidor-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRepartidoresComponent } from '../components/login-repartidores/login-repartidores.component';
import { RegistroRepartidorComponent } from '../components/registro-repartidor/registro-repartidor.component';
import { InicioRepartidorComponent } from '../components/inicio-repartidor/inicio-repartidor.component';
import { RepartidorGuard } from '../services/guards/auth.Repartidor.guard';

const routes: Routes = [
  { path: 'login-repartidores', component: LoginRepartidoresComponent },
  { path: 'registro-repartidor', component: RegistroRepartidorComponent },
  { path: 'inicio-repartidor', component: InicioRepartidorComponent, canActivate:[RepartidorGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepartidorRoutingModule { }
