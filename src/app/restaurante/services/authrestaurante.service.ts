import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthrestauranteService {
  AUTH_SERVER: string = 'http://localhost:3000';
  private token: string | null = null;

  constructor(private httpClient: HttpClient) { }
  RegistroRestaurante(usuarioRestaurante: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/registro-restaurante`, usuarioRestaurante);
  }

  loginRestaurante(userRestaurante: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/login-restaurante`, userRestaurante).pipe(tap(
      (res: any) => {
        if (res && res.dataRestaurant) {
          localStorage.setItem("RESTAURANT_ID", res.dataRestaurant.id);
          localStorage.setItem("RESTAURANT_NAME", res.dataRestaurant.nombreRestaurante);
          localStorage.setItem("ACCESS_TOKEN", res.dataRestaurant.accessToken);
          localStorage.setItem("EXPIRES_IN", res.dataRestaurant.expiresIn);
        }
      })
    );
  }

  logout() {
    this.token = '';
    localStorage.removeItem("RESTAURANT_ID");
    localStorage.removeItem("RESTAURANT_NAME");
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }
//producto
  CrearProducto(Producto: FormData): Observable<any> {
    return this.httpClient.post(`${this.AUTH_SERVER}/crear-producto`, Producto);
  }

  ActualizarProducto(idProducto: string, Producto: FormData): Observable<any> {
    return this.httpClient.put(`${this.AUTH_SERVER}/actualizar-producto/${idProducto}`, Producto);
  }

  eliminarProducto(idProducto: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.AUTH_SERVER}/eliminar-producto/${idProducto}`);
  }

  getProductos(restauranteId: any): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.AUTH_SERVER}/mostrar-producto/${restauranteId}`);
  }

//PEDIDOS
mostrarPedidos(restauranteId: any): Observable<any[]> {
  return this.httpClient.get<any[]>(`${this.AUTH_SERVER}/mostrar-pedido/${restauranteId}`);
}

aceptarOrden(pedidoId: string): Observable<any> {
  return this.httpClient.put(`${this.AUTH_SERVER}/aceptar-pedido/${pedidoId}`, null);
}

rechazarOrden(pedidoId: string): Observable<any> {
return this.httpClient.put(`${this.AUTH_SERVER}/rechazar-pedido/${pedidoId}`, null);
}


OrdenCompletada(pedidoId: string): Observable<any> {
return this.httpClient.put(`${this.AUTH_SERVER}/terminada-pedido/${pedidoId}`, null);
}

OrdenEnvio(pedidoId: string): Observable<any> {
return this.httpClient.put(`${this.AUTH_SERVER}/envio-pedido/${pedidoId}`, null);
}

cancelarProducto(pedidoId: string, productoCancelado: any): Observable<any> {
return this.httpClient.put(`${this.AUTH_SERVER}/cancelar-producto/${pedidoId}`, productoCancelado);
}


correoCancelarProducto(email: string, nombreProducto: string, nombreCliente: string): Observable<any> {
  return this.httpClient.post<any>(`${this.AUTH_SERVER}/enviar-correo-cancelarproducto`, { email, nombreProducto, nombreCliente});
}

correoCancelarOrden(email: string,  nombreCliente: string): Observable<any> {
  return this.httpClient.post<any>(`${this.AUTH_SERVER}/enviar-correo-cancelarOrden`, { email, nombreCliente});
}
}