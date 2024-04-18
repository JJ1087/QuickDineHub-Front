// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BadRequestComponent } from './bad-request/bad-request.component';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';

import { ClienteRoutingModule } from './cliente/routes/cliente-routing.module';
import { AdminRoutingModule } from './admin/routes/admin-routing.module';
import { RepartidorRoutingModule } from './repartidor/routes/repartidor-routing.module';
import { RestauranteRoutingModule } from './restaurante/routes/restaurante-routing.module';
import { CompartidoRoutingModule } from './compartido/routes/compartido-routing.module';


const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta por defecto (Inicio)
  //{ path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige a 'home' por defecto
  //{ path: 'home', component: HomeComponent },
  //{ path: '**', redirectTo: '/not-found' },
  { path: 'not-found', component: NotFoundComponent },
  { path: '400', component: BadRequestComponent }, // Agrega esta línea para el error 400
  { path: 'internal-server-error', component: InternalServerErrorComponent },

  { path: 'cliente', loadChildren: () => import('./cliente/routes/cliente-routing.module').then(m => m.ClienteRoutingModule) },
  { path: 'compartido', loadChildren: () => import('./compartido/routes/compartido-routing.module').then(m => m.CompartidoRoutingModule) },
  { path: 'repartidor', loadChildren: () => import('./repartidor/routes/repartidor-routing.module').then(m => m.RepartidorRoutingModule) },
  { path: 'restaurante', loadChildren: () => import('./restaurante/routes/restaurante-routing.module').then(m => m.RestauranteRoutingModule) },
  { path: 'admin', loadChildren: () => import('./admin/routes/admin-routing.module').then(m => m.AdminRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ClienteRoutingModule,
    AdminRoutingModule,
    RepartidorRoutingModule,
    RestauranteRoutingModule,
    ClienteRoutingModule,
    CompartidoRoutingModule,

  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
