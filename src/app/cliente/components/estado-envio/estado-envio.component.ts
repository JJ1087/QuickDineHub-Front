import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-estado-envio',
  templateUrl: './estado-envio.component.html',
  styleUrl: './estado-envio.component.css'
})

export class EstadoEnvioComponent implements OnInit {

  orderInfo: any;  // Aquí deberías tener una lógica para obtener los datos del pedido desde la BD

  private synth!: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null!;

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  //orderInfo: any = {};


  ngOnInit(): void {

    const routeSnapshot: ActivatedRouteSnapshot = this.route.snapshot;

    const nombreProducto = routeSnapshot.paramMap.get('nombreProducto');
    const descripcionProducto = routeSnapshot.paramMap.get('descripcionProducto');
    const idCliente = routeSnapshot.paramMap.get('idCliente');
    const idDireccion = routeSnapshot.paramMap.get('idDireccion');
    const estadoOrden = routeSnapshot.paramMap.get('estadoOrden');
    const fechaPedido = routeSnapshot.paramMap.get('createdAt');
    const costoUnidad = routeSnapshot.paramMap.get('costoUnidad');
    const idRestaurante = routeSnapshot.paramMap.get('idRestaurante');
    const idCuentaBanco = routeSnapshot.paramMap.get('idCuentaBanco');
    const idOrden = routeSnapshot.paramMap.get('idOrden');

    
    // Asignando los valores a orderInfo
    this.orderInfo = {
      nombreProducto,
      descripcionProducto,
      idCliente,
      idDireccion,
      estadoOrden,
      fechaPedido,
      costoUnidad,
      idRestaurante,
      idCuentaBanco,
      idOrden,
      // idCuentaBanco,
    };

    //traerDatos
    this.obtenerDatoComensal();
    this.obtenerDirecciones();
    this.obtenerRestaurante();
    this.obtenercuentaBancoId();

    

    this.obtenerInfoDeOrdenPorId();


    

  }

//-----ObtenerDatos del cliente----------------------------------------------------

  cliente: any;

  obtenerDatoComensal() {
    if (this.orderInfo.idCliente) {
     // Llama a la función del servicio para obtener las direcciones desde el backend
     this.authService.obtenerDatoComensal(this.orderInfo.idCliente).subscribe(
       (data) => {
         // Actualiza la lista de direcciones con los datos obtenidos
         this.cliente = data;
         console.log('Datos comensal recibidas', this.cliente);
         
       },
       (error) => {
         console.error('Error al obtener las direcciones:', error);
         
         // Maneja el error según sea necesario
       }
     );

    }else{
      console.log('No se esta recibiendo el id del cliente');
    }
   }

//Obtener Datos de direccion---------------------------------------------------------------
direccion: any;

obtenerDirecciones() {

  if (this.orderInfo.idDireccion) {
   // Llama a la función del servicio para obtener las direcciones desde el backend
   this.authService.obtenerDirecciones2(this.orderInfo.idDireccion).subscribe(
     (data) => {
       // Actualiza la lista de direcciones con los datos obtenidos
       this.direccion = data;
       console.log('Direcciones recibidas', this.direccion);
       
     },
     (error) => {
       console.error('Error al obtener las direcciones:', error);
       
       // Maneja el error según sea necesario
     }
   );

  }else{
    console.log('No se esta recibiendo el id del comensal');
  }
 }


 //Obtener Datos de Restaurante---------------------------------------------------------------
 restaurante: any;

 obtenerRestaurante() {

   if (this.orderInfo.idRestaurante) {
    // Llama a la función del servicio para obtener las direcciones desde el backend
    this.authService.obtenerRestaurante(this.orderInfo.idRestaurante).subscribe(
      (data) => {
        this.restaurante = data;
        // Actualiza la lista de direcciones con los datos obtenidos/        
        console.log('Info restaurante recibido', this.restaurante);
       
      },
      (error) => {
        console.error('Error al obtener info restaurante:', error);
       
       // Maneja el error según sea necesario
      }
    );

   }else{     console.log('No se esta recibiendo el id del comensal');
   }
  }

 //Obtener Datos de Restaurante---------------------------------------------------------------
cuenta: any;


obtenercuentaBancoId() {

  if (this.orderInfo.idCuentaBanco) {
   // Llama a la función del servicio para obtener las direcciones desde el backend
   this.authService.obtenercuentaBancoId(this.orderInfo.idCuentaBanco).subscribe(
     (data) => {
       // Actualiza la lista de direcciones con los datos obtenidos
       this.cuenta = data;
       console.log('Info restaurante recibido', this.cuenta);
       
     },
     (error) => {
       console.error('Error al obtener info restaurante:', error);
       
       // Maneja el error según sea necesario
     }
   );

  }else{
    console.log('No se esta recibiendo el id del comensal');
  }
 }

 //Obtener Datos de Restaurante---------------------------------------------------------------
orden: any;
costoEnvio: number=0;
precioTotal: number=0;
obtenerInfoDeOrdenPorId() {

  if (this.orderInfo.idOrden) {
   // Llama a la función del servicio para obtener las direcciones desde el backend
   this.authService.obtenerInfoDeOrdenPorId(this.orderInfo.idOrden).subscribe(
     (data) => {
       // Actualiza la lista de direcciones con los datos obtenidos
       this.orden = data;
       console.log('Info restaurante recibido', this.orden);

       this.costoEnvio = Number(this.orden.costoEnvio.$numberDecimal);
    
        this.precioTotal = Number(this.orden.precioTotal.$numberDecimal);
        console.log(this.precioTotal);
       
     },
     (error) => {
       console.error('Error al obtener info restaurante:', error);
       
       // Maneja el error según sea necesario
     }
   );

  }else{
    console.log('No se esta recibiendo el id del comensal');
  }
 }

 //---Generar estados--------------------------------------------------
 
 // Método para obtener el estado legible de la orden
  obtenerEstado(estadoOrden: string): string {

    switch (estadoOrden) {
      case '0':
        return 'Pedido en espera de ser aceptado por el restaurante';
      case '1':
        return 'Orden rechazada';
      case '2':
        return '¿Desea continuar con la compra?';
      case '3':
        return 'Pedido en espera de ser aceptado por el restaurante';//Esta vez despues de haber quitado algun producto
      case '4':
        return 'En preparación';
      case '5':
        return 'Esperando repartidor';
      case '6':
        return 'Salio de cocina, en camino';
      case '7':
        return 'Entregado';
      default:
        return 'Cargando estado';
    }
  }

//Lector web------------------------------------


  toggleVozAlta() {
    const enableVozAlta = document.getElementById('enableVozAlta') as HTMLInputElement;
    this.synth = window.speechSynthesis;
  
    const elementos = document.querySelectorAll('a, img, h1, p, h2, .title, .option, label, button, .info-title, .info-field' );
  
    elementos.forEach(elemento => {
      elemento.addEventListener('mouseover', () => {
        if (enableVozAlta.checked) {
          if (this.synth.speaking && this.utterance) {
            this.synth.cancel();
          }
  
          let texto = '';
  
          // Verificar si el elemento es una imagen antes de acceder a 'alt'
          if (elemento instanceof HTMLImageElement) {
            texto = elemento.alt;
          } else if (elemento instanceof HTMLElement) {
            texto = elemento.innerText || elemento.textContent || '';
          }
  
          if (texto.trim() !== '') {
            this.utterance = new SpeechSynthesisUtterance(texto);
            this.synth.speak(this.utterance);
          }
        }
      });
    });
  }
}