import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-inicio-cliente',
  templateUrl: './inicio-cliente.component.html',
  styleUrl: './inicio-cliente.component.css'
})


export class InicioClienteComponent implements OnInit{//
  currentIndex = 0;
  showMessage = false;
  showMessage1 = false;
  showWarning = false;

  images: string[] = [
    'assets/Hamburguesa.jpg',
    'assets/Tacos.jpg',
    'assets/Frappe.jpg', 
    'assets/Espagueti.jpg', 
    'assets/Hamburguesa.jpg', 
    'assets/Tacos.jpg', 
    'assets/gourmet.jpg', 
    'assets/pancakes.jpg', 
    'assets/mole.jpg', 
    'assets/bananasplit.jpg', 
  ];
  
  autoPlayInterval: any;
  private synth!: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null!;


  constructor(private router: Router, private authService: AuthService) {}//

  prevImage() {
    // Ajusta según la cantidad de imágenes que desees mostrar al mismo tiempo
    const imagesToShow = 3;
    // Calcula la cantidad de imágenes que se pueden mostrar sin espacios en blanco
    const maxIndex = this.images.length - imagesToShow;
    // Ajusta el índice teniendo en cuenta la cantidad de imágenes a mostrar
    this.currentIndex = (this.currentIndex - 1 + maxIndex) % maxIndex;
  }
  toggleVozAlta() {
    const enableVozAlta = document.getElementById('enableVozAlta') as HTMLInputElement;
    this.synth = window.speechSynthesis;
  
    const elementos = document.querySelectorAll('a, img, h1, p, h2, .title, .option, label, button' );
  
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
  nextImage() {
    // Ajusta según la cantidad de imágenes que desees mostrar al mismo tiempo
    const imagesToShow = 3;
    // Calcula la cantidad de imágenes que se pueden mostrar sin espacios en blanco
    const maxIndex = this.images.length - imagesToShow;
    // Ajusta el índice teniendo en cuenta la cantidad de imágenes a mostrar
    this.currentIndex = (this.currentIndex + 1) % maxIndex;
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextImage();
    }, 2000); // Cambia la imagen cada 2 segundos (ajusta según sea necesario)
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }

  onMouseEnter() {
    this.stopAutoPlay();
  }

  onMouseLeave() {
    this.startAutoPlay();
  }

//----------------Agregar al carrito-------------------------------------------------------

  carrito: { productId: string, idRestaurante: string }[] = [];

  addToCart(productId: string, idRestaurante: string) {

    console.log('Elementos en el carrito: ', this.carrito);
      // Verificar si el ID del producto ya está en el carrito
    if (this.carrito.some(item => item.productId === productId && item.idRestaurante === idRestaurante)) {

      this.showMessage1 = true;

      setTimeout(() => {
          this.showMessage1 = false; 
      }, 3000);
      console.log('Ya esta en el carro');


    }else{

      // Agregar el ID del producto al arreglo del carrito
      console.log('Lo que se va a agregar: ', productId, idRestaurante);
      console.log('COMO ENTRA EN FRONT : ', this.carrito);
      this.carrito.push({productId, idRestaurante});
      console.log('COMO SALE EN FRONT: ', this.carrito);

        // Llamar al servicio para guardar el carrito en la base de datos
      this.authService.guardarCarrito(this.comensalId, this.carrito).subscribe(
        (response) => {
          // Éxito al guardar el carrito en la base de datos
          console.log('Carrito guardado exitosamente en la base de datos');
        },
        (error) => {
          // Manejar errores
          console.error('Error al guardar el carrito:', error);
        }
      );
      
      this.showMessage = true;

      setTimeout(() => {
          this.showMessage = false; 
      }, 4000);

    }
    
  }


  goToCart() {
    // Redireccionar a la página del carrito de compras
    this.router.navigate(['/carrito-clienteG']);
  }

// Modificar la función obtenerRestaurante para que acepte una lista de IDs de restaurante----------------------------
restaurantes: { [idRestaurante: string]: any } = {};

obtenerRestaurante(idsRestaurante: string[]) {
  idsRestaurante.forEach(idRestaurante => {
    this.authService.obtenerRestaurante(idRestaurante).subscribe(
      (data) => {
        // Almacena la información del restaurante
        this.restaurantes[idRestaurante] = data;
        console.log('datos del restaurante: ', this.restaurantes );
      },
      (error) => {
        console.error('Error al obtener info del restaurante:', error);
      }
    );
  });
}

//------------------------------------------------------------------------------------------
isRestaurantOpen(idRestaurante: string): boolean {
  const restaurante = this.restaurantes[idRestaurante];
  if (!restaurante) {
      return false; // Si no se encuentra la información del restaurante, se considera cerrado
  }
  const horaActual = this.obtenerHoraActual();
  return horaActual >= restaurante.horaApertura && horaActual <= restaurante.horaCierre;
}

obtenerHoraActual(): string {
  const ahora = new Date();
  const hora = ahora.getHours().toString().padStart(2, '0'); // Obtener la hora en formato de 2 dígitos
  const minutos = ahora.getMinutes().toString().padStart(2, '0'); // Obtener los minutos en formato de 2 dígitos
  return `${hora}:${minutos}`;
}


//-------------------------------------------------------------------------------------------
//Vamos a traer a los productos de forma dinamica
   products: any[] = [];

   ngOnInit(): void {
    
     this.authService.obtenerInfoDeProducto().subscribe((products: any[]) => {
       console.log('Productos:', products);
       this.products = products; 

       // Obtener IDs únicos de restaurantes
      const idsRestaurante: string[] = Array.from(new Set(products.map(product => product.idRestaurante)));
      
      // Obtener información de los restaurantes
    this.obtenerRestaurante(idsRestaurante);
     },
     (error) => {
      console.error('Error al obtener los productos:', error);
      // Registra el error en la base de datos
      this.registrarErrorEnBD('Error al obtener los productos', 'inicio-cliente.component.ts:166 GET http://localhost:3000/info-producto1 404 (Not Found)');
    });

    //llamar a la funcion para recopilar las ordenes
    this.obtenerOrdenes();
    //Actualizar el valor del carrito
    this.obtenerDatoComensal();

   }



//REGISTRO DE ERROR EN LOGS----------------------------------------------------------------------
   registrarErrorEnBD(errorDetails: string, errorType: string): void {
    this.authService.registrarError(errorDetails, errorType).subscribe(
      (response) => {
        console.log('Error registrado correctamente en el backend');
        console.log('RESPUESTAS DEL BACK',response.mensaje);
        if (response.mensaje === 'Advertencia') {
          // Activa el mensaje de advertencia en el frontend
          alert('Mandar Correo a admin'); 
          
        }

      },
      (error) => {
        console.error('Error al registrar el error:', error);
      }
    );
  }



    // Método para generar la URL completa de la imagen
    getImageUrl(relativePath: string): string {
      return `http://localhost:3000/${relativePath}`;
    }

//Funcion para llamar a mis ordenes--------------------------------------------------------------------------

    ordenes: any[] = [];
    ordenesConEstadoUno: any[] = [];
    ordenesConEstadoDos: any[] = [];
    ordenesConEstadoSiete: any[] = [];
    
   comensalId: string = '661e7ad5a82e3dbd2d0c3067';//TOMAR EL ID DEL CLIENTE EN LOCALSTORAGE en el futuro 
    obtenerOrdenes() {
    

    if (this.comensalId) {
     // Llama a la función del servicio para obtener las direcciones desde el backend
     this.authService.obtenerOrdenes(this.comensalId).subscribe(
       (data) => {
         // Actualiza la lista de ordenes con los datos obtenidos
         this.ordenes = data;
         console.log('Ordenes recibidas', this.ordenes);
         
        // Filtra las órdenes para encontrar aquellas con estadoOrden igual a 2
        this.ordenesConEstadoDos = this.ordenes.filter((orden: any) => orden.estadoOrden === 2);
        console.log('Ordenes con estadoOrden igual a 2:', this.ordenesConEstadoDos);

        // Filtra las órdenes para encontrar aquellas con estadoOrden igual a 1
        this.ordenesConEstadoUno = this.ordenes.filter((orden: any) => orden.estadoOrden === 1);
        console.log('Ordenes con estadoOrden igual a 1:', this.ordenesConEstadoDos);

        // Filtra las órdenes para encontrar aquellas con estadoOrden igual a 7 esperando a finalizar la entrega
        this.ordenesConEstadoSiete = this.ordenes.filter((orden: any) => orden.estadoOrden === 7);
        console.log('Ordenes con estadoOrden igual a 7:', this.ordenesConEstadoSiete);

       },
       (error) => {
         console.error('Error al obtener las ordenes:', error);
         
         // Maneja el error según sea necesario
       }
     );

    }else{
      console.log('No se esta recibiendo el id de la orden');
    }
   }

//-----------------Traer datos del cliente-----------------------------------------------------------
   cliente: any;

  obtenerDatoComensal() {
    console.log('Elementos en el carrito: ', this.carrito);
    if (this.comensalId) {
     // Llama a la función del servicio para obtener las direcciones desde el backend
     this.authService.obtenerDatoComensal(this.comensalId).subscribe(
       (data) => {
         // Actualiza la lista de direcciones con los datos obtenidos
         this.cliente = data;
         console.log('Datos comensal recibidas', this.cliente);

         // Actualiza la variable carrito con los datos del carrito del comensal
          this.carrito = this.cliente.carrito;
          console.log('Carrito del comensal:', this.carrito);
         
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

   actualizarOrdenes(): void {
    console.log('Ejecutando actualizacion de ordenes');
    this.obtenerOrdenes();
    console.log('Si se pudo tilin');
}


}
