import {Injectable} from '@angular/core'
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';
import { Observable} from 'rxjs';

//import { response } from 'express';
import { MatDialog } from '@angular/material/dialog';//AJUSTE
import { MensajeComponent} from '../../compartido/components/mensaje/mensaje.component';//AJUSTE


@Injectable({
    providedIn: 'root'
  })

export class AuthService {
    AUTH_SERVER: string = 'http://localhost:3000';
    //authSubject = new BehaviorSubject(false);
    private token: string | null = null;

    constructor(private httpClient: HttpClient ) {}//Ajuste private dialog: MatDialog
    enviarCorreoAutenticacion(email: string, codigo: string): Observable<any> {
        return this.httpClient.post<any>(`${this.AUTH_SERVER}/enviar-correo`, { email, codigo });
      }

    Registro(usario:any): Observable<any>{
        return this.httpClient.post<any>(`${this.AUTH_SERVER}/registro-cliente`,usario)//.pipe(tap(
        //     (res:JwtResponseI) => {
        //         if(res && res.dataUser){
                     //guardar token
        //             this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
        //             return res;
        //         }else{
        //             throw new Error('Error en el registro');
        //         }
        //     })
        //     );
    }
    
    //------------------------------------------------------

    login(user:any): Observable<any>{
        return this.httpClient.post<any>(`${this.AUTH_SERVER}/login-clientes`,
        user).pipe(tap(
            (res:any) => {
                if(res && res.dataUser){
                    //guardar token
                    //this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
                    localStorage.setItem("ACCESS_TOKEN", res.dataUser.accessToken);
                    localStorage.setItem("EXPIRES_IN", res.dataUser.expiresIn);

                }
            })
            );
    }

    logout(){
        this.token = '';
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("EXPIRES_IN");
    }

    // private saveToken(token:string, expiresIn:string): void{
    //     localStorage.setItem("ACCESS_TOKEN", token);
    //     localStorage.setItem("EXPIRES_IN", expiresIn);
    //     this.token=token;
    // }

    // private getToken(): string | null {
    //     if(!this.token){
    //         this.token = localStorage.getItem("ACCESS_TOKEN");
    //     }
    //     return this.token;
    // }

//-------------------------Treaer la informacion de los platillos

obtenerCantidadProductos(): Observable<number> {
    return this.httpClient.get<number>(`${this.AUTH_SERVER}/cantidad-productos`);
}

obtenerInfoDeProducto(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.AUTH_SERVER}/info-producto1`);
}

obtenerInfoDeProductoPorId(productId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/info-producto/${productId}`);
}

//metodos para la compra------------------------------------------------------------------
// Método para insertar información de envío
crearOrden(ordenData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/crear-orden`, ordenData);
}

crearDetalleOrden(ordenDetalleData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/crear-detalleOrden`, ordenDetalleData);
}

eliminarOrden(orderId: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.AUTH_SERVER}/eliminar-orden/${orderId}`);
  }
  

// Método para insertar información de pago-----------------------------------------------------------------------------------
insertarCuenta(pagoData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/insertar-info-pago`, pagoData);
}

obtenerCuentas(comensalId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/obtener-cuentas/${comensalId}`);
}

// Método para insertar información de direccion ------------------------------------------------------------------------------
insertarDireccion(direccionData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/insertar-info-direccion`, direccionData);
}

obtenerDirecciones(comensalId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/obtener-direcciones/${comensalId}`);
}

obtenerDirecciones2(comensalId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/obtener-direcciones2/${comensalId}`);
}


//----COMPONENTE MIS PEDIDOS-----------------------------------------------------------------------------------------------
obtenerdetalleOrdenes(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.AUTH_SERVER}/info-detalleOrden`);
}

obtenerInfoDeOrdenPorId(ordenId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/info-ordenId/${ordenId}`);
}

//----ESTADO-PEDIDOS----------------------------------------------------------------------------
obtenerDatoComensal(comensalId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/info-comensalId/${comensalId}`);
}

obtenerRestaurante(restauranteId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/info-restauranteId/${restauranteId}`);
}

obtenercuentaBancoId(cuentaBancoId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/info-cuentaBancoId/${cuentaBancoId}`);
}

//Mensajes de notificaciones-------------------------------------------------------

obtenerOrdenes(comensalId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/obtener-ordenes/${comensalId}`);
}

//Carrito-----------------------------------------------------------------------------------------------

guardarCarrito(comensalId: string, carrito: { productId: string, idRestaurante: string }[]): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/guardar-carrito/${comensalId}`, { carrito });
  }
  
actualizarCantidadEnBD(productId: string, cantidad: number, comensalId: string) {
    console.log('Enviando solicitud de actualización de cantidad con productId:', productId, 'y nuevaCantidad:', cantidad, 'y idComensal:', comensalId);
    const url = `${this.AUTH_SERVER}/comensales/${comensalId}/carrito/cantidad`; // Ruta modificada
    return this.httpClient.put(url, { productId, cantidad: cantidad }); // Enviar productId y nuevaCantidad en el cuerpo
  }

  actualizarCantidadProductos(noProductos1: number, orderId: string) {
    console.log('Enviando solicitud de actualización de cantidad de producto:', noProductos1, 'y idComensal:', orderId);
    const url = `${this.AUTH_SERVER}/comensales/${orderId}/noProductos`; // Ruta modificada
    return this.httpClient.put(url, {noProductos1: noProductos1 }); // Enviar productId y nuevaCantidad en el cuerpo
  }

insertarEspesificacion(especificacion: any): Observable<any> {
    console.log("Info del la espesificacion: ", especificacion);
    return this.httpClient.put(`${this.AUTH_SERVER}/insertar-especificacion`, especificacion); 
}

eliminarDeCarrito(productId: string, comensalId: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.AUTH_SERVER}/eliminar-de-carrito/${comensalId}/${productId}`);
}

// Función para actualizar el carrito en el backend
actualizarCarrito(carrito: any[], comensalId: string): Observable<any> {
const body = {
  comensalId: comensalId,
  carrito: carrito
};
return this.httpClient.put(`${this.AUTH_SERVER}/actualizar-carrito`, body);
}

registrarError(errorDetails: string, errorType: string): Observable<any> {
    const errorData = { errorDetails, errorType };
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/registrar-error`, errorData);
  }
//FUERZA BRUTA:
  actualizarIntentosFallidos(userEmail: string, intentosFallidos: number): Observable<any> {
    const body = { userEmail, intentosFallidos };
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/actualizar-intentos-fallidos`, body);
  }


  logDeTransacciones(transactionType: string, ordenId: string, comensalId: string): Observable<any> {
    const transactionData = {
      transactionType,
      ordenId,
      comensalId
    };
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/registrar-transaccion`, transactionData);
  }
  obtenerIntentosFallidos(userEmail: string): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/obtener-intentos-fallidos?userEmail=${userEmail}`);
  }

  enviarCorreoAdvertencia(email: string): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/enviar-correo-advertencia`, { email });
  }

  enviarCorreobloqueo(email: string): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/enviar-correo-bloqueo`, { email });
  }
  

}