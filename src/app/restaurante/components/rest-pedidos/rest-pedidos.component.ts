// rest-pedidos.component.ts
import { Component,OnInit } from '@angular/core';
import { AuthrestauranteService } from '../../services/authrestaurante.service';

@Component({
  selector: 'app-rest-pedidos',
  templateUrl: './rest-pedidos.component.html',
  styleUrl: './rest-pedidos.component.css'
})
export class RestPedidosComponent implements OnInit{
  restauranteId: string | null = null;
  pedidos: any[] = []; // Inicializa como un arreglo vacío
  
 
    // Agrega más pedidos según sea necesario

  constructor(
    private authRestauranteService: AuthrestauranteService,
    ) { }

    ngOnInit(): void {
      // Verificar si 'window' está definido antes de usarlo
      if (typeof window !== 'undefined') {
        this.synth = window.speechSynthesis;
        this.toggleVozAlta();

     this.restauranteId = localStorage.getItem('RESTAURANT_ID');
    //this.obtenerPedidos();
    this.actualizarPedidos();
      } 
   
    }
    
  botonesDeshabilitados = false; // Bandera para controlar el estado de habilitación de los botones
  private synth!: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null!;
  toggleVozAlta() {
    const enableVozAlta = document.getElementById('enableVozAlta') as HTMLInputElement;
    this.synth = window.speechSynthesis;
  
    const elementos = document.querySelectorAll('a, img, h1, p, h2,li, .title, .option, label, button, .orders-title, strong' );
  
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
  acceptOrder(pedido: any) {
    // Muestra el mensaje de confirmación
    const confirmation = confirm("¿Estás seguro de tomar la orden?");
    if (confirmation) {
     pedido.estadoOrden = 4;
        // Realiza la solicitud al servidor para actualizar el estado del pedido
        this.authRestauranteService.aceptarOrden(pedido._id).subscribe(
            (response) => {
                // Verifica si la solicitud se realizó con éxito
                if (response) {
                    console.log('response: ', response)
                    // Si la solicitud es exitosa, establece la propiedad isAccepted a true
                    this.actualizarPedidos();
                    pedido.isAccepted = true;

                    this.actualizarPedidos();
                } else {
                    // Si la solicitud no se realizó con éxito, muestra un mensaje de error o maneja el error según sea necesario
                    console.error("Error al actualizar el estado del pedido.");
          }
            },
            (error) => {
                // Si hay un error en la solicitud, muestra un mensaje de error o maneja el error según sea necesario
                console.error("Error al comunicarse con el servidor:", error);
          }
        );
    }
}

  rejectOrder(pedido: any) {
    // Muestra el mensaje de confirmación
    const confirmation = confirm("¿Estás seguro de rechazar la orden?");
    if (confirmation) {
      pedido.estadoOrden = 1;
      // Realiza la solicitud al servidor para actualizar el estado del pedido
      this.authRestauranteService.rechazarOrden(pedido._id).subscribe(
        (response) => {
      // Verifica si la solicitud se realizó con éxito
      this.pedidos = this.pedidos.filter(p => p !== pedido);
      if (response) {
     // Elimina el pedido

     this.actualizarPedidos();
} else {
    // Si la solicitud no se realizó con éxito, muestra un mensaje de error o maneja el error según sea necesario
    console.error("Error al actualizar el estado del pedido.");
}
},
(error) => {
// Si hay un error en la solicitud, muestra un mensaje de error o maneja el error según sea necesario
console.error("Error al comunicarse con el servidor:", error);
}
);
}
}


  completeOrder(pedido: any) {
    // Muestra el mensaje de confirmación
    const confirmation = confirm("¿Estás seguro de completar la orden?");
    if (confirmation) {
      pedido.estadoOrden = 5;
        // Realiza la solicitud al servidor para actualizar el estado del pedido
        this.authRestauranteService.OrdenCompletada(pedido._id).subscribe(
            (response) => {
                // Verifica si la solicitud se realizó con éxito
                if (response) {
                    // Elimina el pedido
                      pedido.iscompleted = true;
                      this.botonesDeshabilitados = false;

                      this.actualizarPedidos();
                } else {
                    // Si la solicitud no se realizó con éxito, muestra un mensaje de error o maneja el error según sea necesario
                    console.error("Error al actualizar el estado del pedido.");
          }
            },
            (error) => {
                // Si hay un error en la solicitud, muestra un mensaje de error o maneja el error según sea necesario
                console.error("Error al comunicarse con el servidor:", error);
          }
        );
        
    }
  }

    // Otras propiedades y métodos...
    //productoCancelado: any[] = []; // Arreglo para almacenar los productos cancelados
    
    cancelOrder(pedido: any, detalle: any) {
        // Muestra el mensaje de confirmación
        const confirmation = confirm("¿Estás seguro de cancelar el pedido?");
        if (confirmation) {
            const productoCancelado = {
                idDetalle: detalle.idDetalle,
                idProducto: detalle.idProducto,
                nombreProducto: detalle.nombreProducto,
            };
            // Almacena el producto cancelado en el arreglo
           // this.productoCancelado.push(productoCancelado);
            console.log('productos:',productoCancelado)
            // Realiza la solicitud al servidor para cancelar el producto del pedido
            this.authRestauranteService.cancelarProducto(pedido._id, productoCancelado).subscribe(
                (response) => {
                    // Verifica si la solicitud se realizó con éxito
                    if (response) {
                      pedido.estadoOrden = 2; // Cambia el estado a "Producto cancelado"
                      pedido.botonesDeshabilitados = true; // Deshabilita los botones
                      pedido.cancelButtonActive = true; // Marca el botón de cancelar como activo
                        // Vuelve a cargar los pedidos
                        this.actualizarPedidos();
                    } else {
                        // Si la solicitud no se realizó con éxito, muestra un mensaje de error o maneja el error según sea necesario
                        console.error("Error al cancelar el producto del pedido.");
                    }
                },
                (error) => {
                    // Si hay un error en la solicitud, muestra un mensaje de error o maneja el error según sea necesario
                    console.error("Error al comunicarse con el servidor:", error);
                }
            );
        }
    }
  
  camino(pedido: any) {
    // Muestra el mensaje de confirmación
    const confirmation = confirm("¿Estás seguro de que la orden salió de la cocina?");
    if (confirmation) {
      pedido.estadoOrden = 6;
        // Realiza la solicitud al servidor para actualizar el estado del pedido
        this.authRestauranteService.OrdenEnvio(pedido._id).subscribe(
            (response) => {
                // Verifica si la solicitud se realizó con éxito
                if (response) {
                     // Actualiza el estado del pedido y habilita el botón de completado
                    this.pedidos = this.pedidos.filter(p => p !== pedido);

                    this.actualizarPedidos();
                } else {
                    // Si la solicitud no se realizó con éxito, muestra un mensaje de error o maneja el error según sea necesario
                    console.error("Error al actualizar el estado del pedido.");
          }
            },
            (error) => {
                // Si hay un error en la solicitud, muestra un mensaje de error o maneja el error según sea necesario
                console.error("Error al comunicarse con el servidor:", error);
          }
        );
      
     
      
    }
  }
 /*
  obtenerPedidos(): void {
    this.authRestauranteService.mostrarPedidos(this.restauranteId).subscribe(
      (data: any[]) => {
        this.pedidos = data;
      });
  } 
  */


  actualizarPedidos() {
    this.authRestauranteService.mostrarPedidos(this.restauranteId).subscribe(
      (data: any[]) => {
        this.pedidos = data.filter(pedido => pedido.estadoOrden !== 1 && pedido.estadoOrden !== 6);

        // Verifica el estado de cada pedido y deshabilita los botones si es necesario
        this.pedidos.forEach((pedido) => {
          if (pedido.estadoOrden === 2) {
            pedido.botonesDeshabilitados = true;
          } else {
            pedido.botonesDeshabilitados = false;
          }
        });
      },
      (error) => {
        console.error("Error al obtener los pedidos:", error);
      }
    );
  }
}

