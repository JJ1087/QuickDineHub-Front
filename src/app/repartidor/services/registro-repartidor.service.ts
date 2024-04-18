import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegistroRepartidorService {
  private apiUrl = 'http://localhost:3000'; // URL de tu backend
  constructor(private HttpClient: HttpClient) {}
  private token: string | null = null;

enviarCorreoAutenticacion(email: string, codigo: string): Observable<any> {
    return this.HttpClient.post<any>(`${this.apiUrl}/enviar-correo`, { email, codigo });
  }

  registroRepartidor(usuarioRepartidor: FormData): Observable<any> {
    return this.HttpClient.post<any>(`${this.apiUrl}/registro-repartidor`, usuarioRepartidor);
  }

  //LOGIN RESTAURANTE
loginRepartidor(userRepartidor:any): Observable<any>{
  return this.HttpClient.post<any>(`${this.apiUrl}/login-repartidor`,
  userRepartidor).pipe(tap(
      (res:any) => {
          if(res && res.dataRepartidor){
              //guardar token
              //this.saveToken(res.dataRepartidor.accessToken, res.dataRepartidor.expiresIn);
              localStorage.setItem("REPARTIDOR_ID", res.dataRepartidor.id);
              localStorage.setItem("REPARTIDOR_NAME", res.dataRepartidor.nombreRepartidor);
              localStorage.setItem("ACCESS_TOKEN", res.dataRepartidor.accessToken);
              localStorage.setItem("EXPIRES_IN", res.dataRepartidor.expiresIn);
            }
      })
      );
}

logout(){
  this.token = '';
  localStorage.removeItem("REPARTIDOR_ID");
  localStorage.removeItem("REPARTIDOR_NAME");
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("EXPIRES_IN");

}

}