// src/app/admin/admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPerfilesComponent } from '../components/admin-perfiles/admin-perfiles.component';
import { AdminActivacionPerfilesComponent } from '../components/admin-activacion-perfiles/admin-activacion-perfiles.component';
import { InfoRegistroRestauranteComponent } from '../components/info-registro-restaurante/info-registro-restaurante.component';
import { InfoRegistroRepartidorComponent } from '../components/info-registro-repartidor/info-registro-repartidor.component';
import { InfoRegistroClienteComponent } from '../components/info-registro-cliente/info-registro-cliente.component';

const routes: Routes = [
  { path: 'admin-perfiles', component: AdminPerfilesComponent },
  { path: 'admin-activacion-perfiles', component: AdminActivacionPerfilesComponent },
  { path: 'info-registro-restaurante', component: InfoRegistroRestauranteComponent },
  { path: 'info-registro-repartidor', component: InfoRegistroRepartidorComponent},
  { path: 'info-registro-cliente', component: InfoRegistroClienteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
