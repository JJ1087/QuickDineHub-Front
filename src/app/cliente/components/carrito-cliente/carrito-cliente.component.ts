import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute para obtener parámetros de la URL
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MensajeComponent } from '../../../compartido/components/mensaje/mensaje.component';
import { MatDialog } from '@angular/material/dialog';

import { ViewChild, ElementRef } from '@angular/core';
import { Timestamp } from 'rxjs';



@Component({
  selector: 'app-carrito-cliente',
  templateUrl: './carrito-cliente.component.html',
  styleUrl: './carrito-cliente.component.css'
})



export class CarritoClienteComponent implements OnInit{

  // En la clase del componente, agregamos ViewChild para obtener una referencia al elemento <select>, asi obtenemos el id de direcciones y cuenta para la orden
  @ViewChild('direccionSelect') direccionSelect!: ElementRef;
  @ViewChild('cuentaSelect') cuentaSelect!: ElementRef;

  mostrarFormularioDireccion = false;
  direcciones: any[] = [];
  nuevaDireccion = { colonia: '', calle: '', noCasa: '', datoExtra: '', idCliente: '' };

  mostrarFormularioCuenta = false;
  cuentas: any[] = [];
  nuevaCuenta = { nombreTitular: '', fechaVencimiento: '', noTarjeta: '', cvv: '', idCliente: ''};

  mostrarCompraExitosa: boolean = false;
  compraRealizada: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, public dialog: MatDialog) { }

//LOGICA PARA LAS DIRECCIONES------------------------------------------------------------------------------------------
  
  idCliente: string = '661e7ad5a82e3dbd2d0c3067';//TOMAR EL ID DEL CLIENTE EN LOCALSTORAGE

  agregarDireccion() {

    this.nuevaDireccion.idCliente = this.idCliente;
    // Agrega la nueva dirección a la lista local
    this.direcciones.push({ ...this.nuevaDireccion });

    // Llama a la función para insertar la nueva dirección en la base de datos
    this.authService.insertarDireccion(this.nuevaDireccion).subscribe(
      (response) => {
        // Si la inserción es exitosa, obtén nuevamente las direcciones para reflejar los cambios
        this.obtenerDirecciones();
        // Reinicia el formulario de nueva dirección
        this.nuevaDireccion = { colonia: '', calle: '', noCasa: '', datoExtra: '', idCliente: '' };
        // Oculta el formulario de nueva dirección
        this.mostrarFormularioDireccion = false;
        console.log('Insercion correcta de datos de direccion');
        this.mostrarMensajeEmergente('Direccón creada', '');

      },
      (error) => {
        console.error('Error al insertar la dirección:', error);
        this.mostrarMensajeEmergente('Error al insertar la dirección', '');
        // Maneja el error según sea necesario
      }
    );
  }

    comensalId: string = '661e7ad5a82e3dbd2d0c3067';//TOMAR EL ID DEL CLIENTE EN LOCALSTORAGE
    obtenerDirecciones() {

    if (this.comensalId) {
     // Llama a la función del servicio para obtener las direcciones desde el backend
     this.authService.obtenerDirecciones(this.comensalId).subscribe(
       (data) => {
         // Actualiza la lista de direcciones con los datos obtenidos
         this.direcciones = data;
         console.log('Direcciones recibidas');
         
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


   private mostrarMensajeEmergente(mensaje: string, redireccion: string) {
    // Abre el cuadro de diálogo con el mensaje
    console.log('Redireccion:', redireccion); 
    this.dialog.open(MensajeComponent, {
      width: '400px',
      data: { mensaje: mensaje, redireccion: redireccion }
    });
  }


//LOGICA PARA LAS CUENTAS BANCO------------------------------------------------------------------------------------------

  //idCliente: string = '65f40c9590f4191147e0de78';//Esta en "crearDireccion"
  agregarCuenta() {

    this.nuevaCuenta.idCliente = this.idCliente;
    // Agrega la nueva dirección a la lista local
    this.cuentas.push({...this.nuevaCuenta});

    // Llama a la función para insertar la nueva dirección en la base de datos
    this.authService.insertarCuenta(this.nuevaCuenta).subscribe(
      (response) => {
        // Si la inserción es exitosa, obtén nuevamente las direcciones para reflejar los cambios
        this.obtenerCuentas();
        // Reinicia el formulario de nueva dirección
        this.nuevaCuenta = { nombreTitular: '', fechaVencimiento: '', noTarjeta: '', cvv:'', idCliente:'' }; // Reiniciar el formulario
        // Oculta el formulario de nueva dirección
        this.mostrarFormularioCuenta = false;
        console.log('Insercion correcta de datos de cuentaBancaria');
        this.mostrarMensajeEmergente('Cuenta creada', '');

      },
      (error) => {
        console.error('Error al insertar la cuentaBancaria:', error);
        this.mostrarMensajeEmergente('Error al insertar la cuenta Bancaria', '');
        // Maneja el error según sea necesario
      }
    );
  }

  //comensalId: string = '65f40c9590f4191147e0de78';//Esta en "btenerDirecciones" ARRIBA
    obtenerCuentas() {

    if (this.comensalId) {
     // Llama a la función del servicio para obtener las cuentas desde el backend
     this.authService.obtenerCuentas(this.comensalId).subscribe(
       (data) => {
         // Actualiza la lista de cuentas con los datos obtenidos
         this.cuentas = data;
         console.log('Cuentas recibidas');
         
       },
       (error) => {
         console.error('Error al obtener las cuentas:', error);
         
         // Maneja el error según sea necesario
       }
     );

    }else{
      console.log('No se esta recibiendo el id del comensal');
    }
   }




//---------------TRAER LA INFORMACION DEL PRODUCTO----------------------------------------------------------------------
  product: any;

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('ID:', productId);
    if (productId) {
      // Llamar al servicio para obtener la información del producto por su ID
      this.authService.obtenerInfoDeProductoPorId(productId).subscribe(
        (data) => {
          this.product = data;
          console.log('Info del producto:', data);

          this.actualizarTotal();//actualizar los valores mostrados en el RESUMEN con los precios reales al momento de entrar al apartado

          this.idRestaurante = data.idRestaurante;// Asigna el idRestaurante del producto al idRestaurante del componente
          this.costoEnvio = data.costoEnvio;
          //detalleOrden
          this.idProducto = productId;
          this.nombreProducto = this.product.nombre;
          this.descripcionProducto = this.product.descripcion;
          this.costoUnidad =  Number (this.product.precio.$numberDecimal);

        },
        (error) => {
          console.error('Error al obtener la información del producto:', error);
        }
      );
    } else {
      console.error('El ID del producto es nulo.');
    }

    // Llama a la función para obtener las direcciones al iniciar el componente
    this.obtenerDirecciones();
    this.obtenerCuentas()
  }

//CALCULO DE CANTIDADES------------------------------------------------------------------------------------------------------------------------------------------

  cantidadSeleccionada: number = 1; // Valor inicial
  precioTotal: number=0; // Valor inicial
  precioEnvio: number=0; // Valor inicial
  subTotal: number=0; // Valor inicial

  actualizarCantidad() {
    this.cantidadSeleccionada = Number(this.cantidadSeleccionada);//Toma el numero del combo
    console.log('Cantidad del combo:', this.cantidadSeleccionada);

    this.validarCantidad();//que no ponga numeros negativos etc
    this.actualizarTotal();//Segun la cantidad del combo actualizar precios
    
  }

  validarCantidad() {
    // Verificar si la cantidad seleccionada es menor o igual a cero
    if (this.cantidadSeleccionada < 0) {
        alert('Ingrese una cantidad correcta');
        this.cantidadSeleccionada = 1; // Restaurar el valor por defecto
    }
    // Verificar si la cantidad seleccionada es mayor a 100
    else if (this.cantidadSeleccionada > 100) {
        alert('La cantidad máxima permitida es 100');
        this.cantidadSeleccionada = 100; // Restaurar el valor máximo permitido
    }
  }

  actualizarTotal() {
    this.precioTotal  = Number (this.product.precio.$numberDecimal);
    this.precioEnvio = Number (this.product.costoEnvio.$numberDecimal)

    this.subTotal = Number (this.precioTotal * this.cantidadSeleccionada + this.precioEnvio)
    this.precioTotal = Number(this.subTotal.toFixed(2));//mostrar solo dos puntos decimales
  }


// Función para crear y enviar la orden al backend----------------------------------------------------------------------------------------

// Define las propiedades necesarias para recopilar los datos de la orden

//idCliente: string = '65f40c9590f4191147e0de75';YA ESTA DEFINIDO ARRIBA "INSERCION DE DIRECCION"

idRestaurante: string = ''; // Recuperamos el valor de la funcion ngOnInit, obtenemos el valor que viene del back del producto
idRepartidor: string = '000000000000000000000000';//Valor correcto asignado despues de ser aceptado por restaurante

obtenerIdDireccion(): string {//funcion para recuperar el id de la direccion segun el elemento seleccionado del  combo
  // Utilizamos la referencia al elemento <select> para obtener el valor seleccionado
  const direccionId = this.direccionSelect.nativeElement.value;
  console.log('idRecibidoDireccion: ', direccionId);
  return direccionId;
}

obtenerIdCuentaBanco(): string {//funcion para recuperar el id de la cuenta segun el elemento seleccionado del  combo
  // Utilizamos la referencia al elemento <select> para obtener el valor seleccionado
  const cuentaId = this.cuentaSelect.nativeElement.value;
  console.log('idRecibidoCuenta: ', cuentaId);
  return cuentaId;
}

especificaciones: string = '';
costoEnvio: number = 0;

 

//precioTotal: number = 0; DEFINIDO EN CALCULO DE CANTIDADES

crearOrden(): void {
  const nuevaOrden = {
    idCliente: this.idCliente,
    idRestaurante: this.idRestaurante,
    idRepartidor: this.idRepartidor,
    idDireccion: this.obtenerIdDireccion(),
    idCuentaBanco: this.obtenerIdCuentaBanco(),
    especificaciones: this.especificaciones,
    costoEnvio: this.costoEnvio,
    precioTotal: this.precioTotal
  };

  // Llama al servicio para enviar la nueva orden al backend
  this.authService.crearOrden(nuevaOrden).subscribe(
    (response) => {
      // Maneja la respuesta del backend según sea necesario
      console.log('Orden creada exitosamente:', response);
      // Restablece los valores de las propiedades para la próxima orden
      const orderId = response._id; // Obtiene el ID de la orden creada desde la respuesta del backend 
      console.log('Id de la nueva orden:', orderId);
      this.crearDetallesOrden(orderId);// Llama a la función para crear los detalles de la orden, pasando el ID de la orden creada
      
    },
    (error) => {
      console.error('Error al crear la orden:', error);
      this.mostrarMensajeEmergente('Lo siento, no se pudo realizar la compra, intente de nuevo en unos minutos.', '');

    }
  );
}

// Función para restablecer los valores de las propiedades después de crear una orden
resetearValores(): void {
  this.especificaciones = '';
  this.costoEnvio = 0;
  this.precioTotal = 0;
}

//-------------------------------Detaslles de la orden--------------------------------------------------
// Recuperamos los valores de la funcion ngOnInit, obtenemos el valor que viene del back del producto
idProducto: string = ''; 
nombreProducto: string = '';
descripcionProducto: string = '';
costoUnidad: number = 0;



crearDetallesOrden(orderId: string): void  {
    
    const nuevoDetalle = {
      idOrden: orderId, // Asigna el ID de la orden principal al detalle
      idProducto: this.idProducto,
      nombreProducto: this.nombreProducto,
      descripcionProducto: this.descripcionProducto,
      cantidadProducto: this.cantidadSeleccionada, //Se toma el valor del combo en la funcion actualizarCantidad()
      costoUnidad: this.costoUnidad,
      subtotal: this.costoUnidad * this.cantidadSeleccionada,
    };

    // Llama al servicio para enviar el nuevo detalle de la orden al backend
    this.authService.crearDetalleOrden(nuevoDetalle).subscribe(
      (response) => {
        // Maneja la respuesta del backend según sea necesario
        console.log('Detalle de orden creado exitosamente:', response);
        this.resetearValores();
        this.mostrarCompraExitosa = true;
        this.compraRealizada = true;

      },
      (error) => {
        console.error('Error al crear el detalle de orden:', error);
        
        // Muestra un mensaje de error al usuario si es necesario
        this.mostrarMensajeEmergente('Lo siento, no se pudo realizar la compra, intente de nuevo en unos minutos2.', '');
        this.eliminarOrdenCreada(orderId);
      }
    );


}

eliminarOrdenCreada(orderId: string): void {
  console.log('Id que se quiere eliminar: ', orderId);
  // Llama al servicio para eliminar la orden utilizando el ID orderId
  this.authService.eliminarOrden(orderId).subscribe(
    
    (response) => {
      console.log('Orden eliminada exitosamente:', response);
    },
    (error) => {
      console.error('Error al eliminar la orden:', error);
      // Muestra un mensaje de error al usuario si es necesario
    }
  );
}





//Mensajes de Compra----------------------------------------------------------------------------------------------------------------
realizarCompra() {

  this.crearOrden();
  
}

seguirComprando() {
  this.router.navigateByUrl('/inicio-cliente');
}

}

