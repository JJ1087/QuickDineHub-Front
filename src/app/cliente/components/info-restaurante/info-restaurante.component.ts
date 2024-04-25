
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-restaurante',
  templateUrl: './info-restaurante.component.html',
  styleUrl: './info-restaurante.component.css'
})
export class InfoRestauranteComponent {
  showMessage = false;
  showMessage1 = false;
  showWarning = false;
  currentIndex = 0;

  constructor(private router: Router, private authService: AuthService) {}//

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

  //Vamos a traer a los productos de forma dinamica
  products: any[] = [];

  ngOnInit(): void {
   
    this.authService.obtenerInfoDeProducto().subscribe((products: any[]) => {
      console.log('Productos:', products);
      this.products = products; 
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
ordenesConEstadoDos: any[] = [];

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

}

