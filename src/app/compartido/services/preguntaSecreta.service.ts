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

  agregarLogAutenticacion(email: string, tipoEdicion: string): Observable<any> {
    console.log('email:', email, 'edicion:', tipoEdicion);
    const logData = { userCorreo: email, tipoEdicion: tipoEdicion };
    const url = `${this.apiUrl}/agregar-log-autentificacion`; // Ruta específica para agregar log de autenticación
    return this.HttpClient.post<any>(url, logData);
  }

  actualizarEstadoOrden(idOrden: string, idDetalle: string,): Observable<any> {
    console.log('idOrden:', idOrden, 'idDetalle:', idDetalle);
    const url = `${this.apiUrl}/ordenes/${idOrden}/${idDetalle}/actualizarEstado`; // Suponiendo que tienes una ruta en tu backend para actualizar el estado de la orden
    return this.HttpClient.put<any>(url, null); // Envía una solicitud PUT vacía, ya que solo necesitas el ID de la orden
  }

  logDeTransacciones(transactionType: string, ordenId: string, comensalId: string): Observable<any> {
    const transactionData = {
      transactionType,
      ordenId,
      comensalId
    };
    return this.HttpClient.post<any>(`${this.apiUrl}/registrar-transaccion`, transactionData);
  }

  eliminarOrden(ordenId: string): Observable<any> {
    console.log("Vamos en el servicio todo ok, id: ", ordenId);
    return this.HttpClient.delete<any>(`${this.apiUrl}/eliminar-producto-de-orden/${ordenId}`);
  }

enviarCorreoLog(email: string): Observable<any> {
    return this.HttpClient.post<any>(`${this.apiUrl}/enviar-correo-log`, { email});
  }

  
}
