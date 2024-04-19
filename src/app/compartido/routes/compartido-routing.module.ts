// src/app/compartido/compartido-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvisosPrivacidadComponent } from '../components/avisos-privacidad/avisos-privacidad.component';
import { ConocenosComponent } from '../components/conocenos/conocenos.component';
import { PoliticasDePrivacidadComponent } from '../components/politicas-de-privacidad/politicas-de-privacidad.component';
import { RestaurarConCorreoComponent } from '../components/restaurar-con-correo/restaurar-con-correo.component';
import { RestaurarConPreguntaComponent } from '../components/restaurar-con-pregunta/restaurar-con-pregunta.component';
import { RestaurarConCorreoRepartidorComponent } from '../components/restaurar-con-correo-repartidor/restaurar-con-correo-repartidor.component';
import { RestaurarConPreguntaRepartidorComponent } from '../components/restaurar-con-pregunta-repartidor/restaurar-con-pregunta-repartidor.component';
import { RestaurarConCorreoRestauranteComponent } from '../components/restaurar-con-correo-restaurante/restaurar-con-correo-restaurante.component';
import { RestaurarConPreguntaRestauranteComponent } from '../components/restaurar-con-pregunta-restaurante/restaurar-con-pregunta-restaurante.component';
import { AcercaDeNosotrosComponent } from '../components/acerca-de-nosotros/acerca-de-nosotros.component';
import { CookiesComponent } from '../components/cookies/cookies.component';
import { FaqComponent } from '../components/faq/faq.component';
import { TerminosYCondicionesComponent } from '../components/terminos-y-condiciones/terminos-y-condiciones.component';

const routes: Routes = [
    { path: 'avisos-privacidad', component: AvisosPrivacidadComponent },
    { path: 'conocenos', component: ConocenosComponent },  
    { path: 'politicas-de-privacidad', component: PoliticasDePrivacidadComponent },
    { path: 'restaurar-con-correo', component: RestaurarConCorreoComponent },
    { path: 'restaurar-con-pregunta', component: RestaurarConPreguntaComponent },
    { path: 'restaurar-con-correo-repartidor', component: RestaurarConCorreoRepartidorComponent },
    { path: 'restaurar-con-pregunta-repartidor', component: RestaurarConPreguntaRepartidorComponent },
    { path: 'restaurar-con-correo-restaurante', component: RestaurarConCorreoRestauranteComponent },
    { path: 'restaurar-con-pregunta-restaurante', component: RestaurarConPreguntaRestauranteComponent },
    { path: 'acerca-de-nosotros', component:AcercaDeNosotrosComponent},
    { path: 'cookies', component:CookiesComponent},
    { path: 'faq', component:FaqComponent},
    { path: 'terminos-y-condiciones', component:TerminosYCondicionesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompartidoRoutingModule { }
