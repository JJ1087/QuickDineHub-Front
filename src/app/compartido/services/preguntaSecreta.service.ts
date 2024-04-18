import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntaSecretaService {

  private apiUrl = 'http://localhost:3000'; // URL de tu backend
  constructor(private HttpClient: HttpClient) {}
  
  obtenerPreguntaYRespuestaSecreta(email: string): Observable<any> {
    // Modificar la URL para incluir el correo electrónico como parámetro
    return this.HttpClient.get<any>(`${this.apiUrl}/restaurar-con-correo/${email}`);
  }

  cambiarContraseña(email: string, nuevaContraseña: string): Observable<any> {
    // Asume que tienes un endpoint 'api/cambiar-contraseña' que acepta POST
    return this.HttpClient.post(`${this.apiUrl}/restaurar-con-correo`, { email, nuevaContraseña });
  }

  obtenerPreguntaYRespuestaSecretaRepartidor(email: string): Observable<any> {
    // Modificar la URL para incluir el correo electrónico como parámetro
    return this.HttpClient.get<any>(`${this.apiUrl}/restaurar-con-correo-repartidor/${email}`);
  }

  cambiarContraseñaRepartidor(email: string, nuevaContraseña: string): Observable<any> {
    // Asume que tienes un endpoint 'api/cambiar-contraseña' que acepta POST
    return this.HttpClient.post(`${this.apiUrl}/restaurar-con-correo-repartidor`, { email, nuevaContraseña });
  }

  obtenerPreguntaYRespuestaSecretaRestaurante(email: string): Observable<any> {
    // Modificar la URL para incluir el correo electrónico como parámetro
    return this.HttpClient.get<any>(`${this.apiUrl}/restaurar-con-correo-restaurante/${email}`);
  }

  cambiarContraseñaRestaurante(email: string, nuevaContraseña: string): Observable<any> {
    // Asume que tienes un endpoint 'api/cambiar-contraseña' que acepta POST
    return this.HttpClient.post(`${this.apiUrl}/restaurar-con-correo-restaurante`, { email, nuevaContraseña });
  }

  enviarCorreoAutenticacion(email: string, codigo: string): Observable<any> {
    return this.HttpClient.post<any>(`${this.apiUrl}/enviar-correo`, { email, codigo });
  }

  
}
