import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute para obtener parámetros de la URL
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MensajeComponent } from '../../../compartido/components/mensaje/mensaje.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-carrito-clienteG',
  templateUrl: './carrito-clienteG.component.html',
  styleUrl: './carrito-clienteG.component.css'
})

export class CarritoClienteComponentG implements OnInit{

  mostrarFormularioDireccion = false;
  direcciones: any[] = [];
  nuevaDireccion = { colonia: '', calle: '', noCasa: '', datoExtra: '', idCliente: '' };
  opcionesColonia: string[] = ["Capitan Antonio Reyes", "Linda Vista", "Hidalgo", "Parque de poblamiento", "Lomas de Chapultepec"];
  productoEspecificaciones: string = ''; // Declaración de la propiedad
  especificaciones: string = ''; // Define la propiedad 'especificaciones' y asigna un valor inicial
  cantidadSeleccionada: number = 0; // Define la propiedad 'cantidadSeleccionada' y asigna un valor inicial
  subTotal: number = 0;
  precioTotal: number = 0; // Define la propiedad precioTotal y asigna un valor inicial
  precioEnvio: number = 0; // Define la propiedad precioEnvio y asigna un valor inicial

  mostrarFormularioCuenta = false;
  cuentas: any[] = [];
  nuevaCuenta = { nombreTitular: '', fechaVencimiento: '', noTarjeta: '', cvv: '', idCliente: ''};

  mostrarCompraExitosa: boolean = false;
  compraRealizada: boolean = false;


  constructor(private router: Router, private route: ActivatedRoute,  private authService: AuthService, public dialog: MatDialog) { }

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

coloniaSeleccionada: string = ''; 
colonia:string="";
idDireccion:string="";
precioEnvio1:number=0;

seleccionarDireccion() {
  const selectedOption: any = this.coloniaSeleccionada;
  this.colonia = selectedOption.colonia;
  this.idDireccion = selectedOption.idDireccion;
  // Realizamos acciones con los valores obtenidos
  console.log('Colonia seleccionada:', this.colonia);
  console.log('idDireccion:', this.idDireccion);
  console.log('idDireccion:', this.coloniaSeleccionada);

  this.precioEnvio1 = this.obtenerPrecioEnvio(this.colonia);
  console.log('idDireccion:', this.precioEnvio1);
  //suma de subtotales mas envio
  this.calcularTotalGeneral();
}



// Método para obtener el estado legible de la orden
obtenerPrecioEnvio(colonia: string): number {
  switch (colonia) {
    case "Capitan Antonio Reyes":
      return 38;
    case "Linda Vista":
      return 42;
    case "Hidalgo":
      return 29;
    case "Parque de poblamiento":
      return 49;
    case "Lomas de Chapultepec":
      return 25;
    default:
      return 0;
  }
}


//LOGICA PARA LAS CUENTAS BANCO------------------------------------------------------------------------------------------

//---------Logica Para agregar cuentas de Banco

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

   cuentaSeleccionada: string = ''; 
   idCuentaBanco:string="";   
   seleccionarCuentaBanco() {
     const selectedOption: any = this.cuentaSeleccionada;
     this.idCuentaBanco = selectedOption.idCuentaBanco;
     // Realizamos acciones con los valores obtenidos

     console.log('idCuenta:', this.idCuentaBanco);
     console.log('idCuenta:', this.cuentaSeleccionada);
   }

  //---------------Actualizar valor de combos----------------------------------------------------------------------
  product: any;

  ngOnInit(): void {
    
    // Llama a la función para obtener las direcciones al iniciar el componente
    this.obtenerDirecciones();
    this.obtenerCuentas();
    this.obtenerDatoComensal();
    
    
  }


// Traer productos agregados al carrito dinamicamente------------------------------------------------------}
precioTotalGeneral : number=0;//ESTA VARIABLE GUARDARA LA SUMA DEL PRECIO TOTAL DE TODOS LOS PRODUCTOS MAS ENVIO
noProductos:number=0;//GUARDA EL NUMERO DE PRODUCTOS QUE GUARDA EL CARRITO PARA RECORRER EL ARREGLO
sumaSubTotales: number=0;//GUARDA LA SUMA DE LOS PRECIOS SUBTOTALES DE TODOS LOS PRODUCTOS

cliente: any;
carritoConsulta: { productId: string, idRestaurante: string, cantidad: number, especificacion: string}[] = [];
productosPorRestaurante: { [idRestaurante: string]: any[] } = {};


obtenerDatoComensal() {
  console.log('Elementos en el carrito: ', this.carritoConsulta);
  if (this.comensalId) {
   // Llama a la función del servicio para obtener las direcciones desde el backend
   this.authService.obtenerDatoComensal(this.comensalId).subscribe(
     (data) => {
       // Actualiza la lista de direcciones con los datos obtenidos
       this.cliente = data;
       
       console.log('Datos comensal recibidas', this.cliente);

       // Actualiza la variable carrito con los datos del carrito del comensal
        this.carritoConsulta = this.cliente.carrito;
        console.log('Carrito del comensal:', this.carritoConsulta);
      
        // Contar el número de productos en el carrito
        this.noProductos = this.carritoConsulta.length;
        console.log('Número de productos en el carrito:', this.noProductos);

        // Agrupar productos por restaurante
        this.productosPorRestaurante = {};
        this.carritoConsulta.forEach(item => {
          if (!this.productosPorRestaurante[item.idRestaurante]) {
              this.productosPorRestaurante[item.idRestaurante] = [];
          }
          this.productosPorRestaurante[item.idRestaurante].push(item.productId);
        });

        console.log('Productos por restaurante:', this.productosPorRestaurante);
        //LLamar a la funcion que trae la informacion de los pedidos
        this.obtenerInformacionProductos();
        this.calcularTotalProductos();
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

//---------------------------------------Traer informacion de los productos----------------------------------
productos: { [productId: string]: any } = {};
showMessage = true;

idRestaurante: string[] = [];
restaurantes: { [idRestaurante: string]: any } = {};


obtenerInformacionProductos() {
  console.log('Antes de pasar a producto: ', this.productos);

  // Recorre todos los IDs de productos en el carrito y obtén la información de cada uno
  this.carritoConsulta.forEach(item => {
    this.authService.obtenerInfoDeProductoPorId(item.productId).subscribe(
      (data) => {
        
        // Almacena la información del producto en el objeto 'productos' utilizando su ID como clave
        this.productos[item.productId] = data;

        // Almacena la cantidad del producto del carrito y las espesificaciones
        this.productos[item.productId].cantidad = item.cantidad;
        this.productos[item.productId].especificacion = item.especificacion;
        console.log('Productos que cargan el inicializar componente', this.productos);

        // Almacena el ID del restaurante asociado con este producto
        this.idRestaurante.push(item.idRestaurante);

        // Una vez que se carga un producto, verificamos si todos los productos han sido cargados
         const todosLosProductosCargados = Object.keys(this.productos).length === this.carritoConsulta.length;
         if (todosLosProductosCargados) {
             this.showMessage = false; 
             this.obtenerRestaurante();  
         }

         // Sumar el subtotal de todos los productos
         console.log('BOUDELER:', this.eliminoProducto);
         if(this.eliminoProducto === 0){
          console.log('BOUDELER:', this.eliminoProducto);
          this.sumaSubTotales=0;
           for (let productId in this.productos) {
             const producto = this.productos[productId];
             const costoUnidad = Number(producto.precio.$numberDecimal);
             const subtotal = costoUnidad * producto.cantidad;
             this.sumaSubTotales += subtotal;
           }
           console.log('Suma de subtotales:', this.sumaSubTotales);
         }
         //Calcular suma de subtotales mas envio
         this.calcularTotalGeneral();


      },
      (error) => {
        console.error('Error al obtener la información de los productos:', error);
      }
    );
  });
}

// Agregar una nueva propiedad para almacenar la cantidad total de productos
totalProductos: number = 0;
// Método para calcular la cantidad total de productos en el carrito
calcularTotalProductos() {
  this.totalProductos = 0;
  this.carritoConsulta.forEach(item => {
    this.totalProductos += item.cantidad;
  });
}


calcularTotalGeneral() {
  this.precioTotalGeneral=0;
  this.precioTotalGeneral=this.sumaSubTotales + this.precioEnvio1;
}




//Obtener Datos de Restaurante---------------------------------------------------------------
obtenerRestaurante() {
  
  
  // Eliminar duplicados de la lista de IDs de restaurante
  const idsUnicos = Array.from(new Set(this.idRestaurante));
  // Iterar sobre cada ID de restaurante y obtener la información del restaurante
  idsUnicos.forEach(idRestaurante => {
    this.authService.obtenerRestaurante(idRestaurante).subscribe(
      (data) => {
        // Almacena la información del restaurante
        this.restaurantes[idRestaurante] = data;
        
      },
      (error) => {
        console.error('Error al obtener info del restaurante:', error);
      }
    );
  });
}


//Administrar la cantidad de productos que se quieren pedir---------------------------------------------------------
actualizarCantidad(op: string, producto: any, productId: string) {
  // Verificar si se debe incrementar o decrementar la cantidad
  if (op === '+') {
      // Incrementar la cantidad si no excede el límite máximo
      if (producto.cantidad < 100) {
          producto.cantidad++;
          console.log(producto);
          this.actualizarCantidadEnBD(productId, producto.cantidad);
      }
  } else if (op === '-') {
      // Decrementar la cantidad si no es menor que 1
      if (producto.cantidad > 1) {
          producto.cantidad--;
          console.log(producto);
          this.actualizarCantidadEnBD(productId, producto.cantidad);
      }
  }
  // Calcular el subtotal nuevamente y actualizar la interfaz
  this.actualizarSubtotal(producto, productId);
}

actualizarCantidadEnBD(productId: string, nuevaCantidad: number) {
  this.authService.actualizarCantidadEnBD(productId, nuevaCantidad, this.comensalId)
    .subscribe(
      (response) => {
        console.log('Cantidad actualizada en la base de datos:', response);
        this.eliminoProducto = 0;
        this.obtenerDatoComensal();
        
      },
      (error) => {
        console.error('Error al actualizar la cantidad en la base de datos Beto:', error);
        // Maneja el error según sea necesario
      }
    );
}

calcularSubtotal(producto: any): number {
  // Extraer el valor numérico del precio
  const costoUnidad = Number(producto.precio.$numberDecimal);
  // Calcular el subtotal
  const subTotal = costoUnidad * producto.cantidad;
  return subTotal;
}

// Función para actualizar el subtotal de un producto en el carrito
actualizarSubtotal(producto: any, productId: string) {
  const subTotal = this.calcularSubtotal(producto);
  // Actualizar el subtotal en el objeto productos
  this.productos[productId].subTotal = subTotal;
}

//LOGICA PARA AGRUEGAR ESPECIFICACIONES--------------------------------------------------------------
mostrarFormularioEspecificacion = false;
nuevaEspesificacion = { especificacion: '', idCliente: '', idProducto: ''};
especificacionProducto: string = "";

agregarEspecificacion() {
  this.nuevaEspesificacion.idCliente = this.comensalId;
  console.log("Formulario de espesificaciones: ", this.nuevaEspesificacion);
  

  this.authService.insertarEspesificacion(this.nuevaEspesificacion).subscribe(
    (response) => {
      // Una vez que se inserta correctamente la especificación, actualizamos el valor en el objeto productos
      this.productos[this.nuevaEspesificacion.idProducto].especificacion = this.nuevaEspesificacion.especificacion;
      this.mostrarFormularioEspecificacion = false;
      console.log('Insercion correcta de datos de espesificacion');
      this.obtenerDatoComensal();
    },
    (error) => {
      console.error('Error al insertar la espesificacion:', error);
      this.mostrarMensajeEmergente('Error al crear la especificación', '');
      // Maneja el error según sea necesario
    }
  );
}

//ELIMINAR PRODUCTO DEL CARRITO------------------------------------------------------------------------------------------
eliminarDeCarrito(productId: string) {
  this.authService.eliminarDeCarrito(productId, this.comensalId)
    .subscribe(
      (response) => {
        console.log('Producto eliminado del carrito:', response);
        //Actualizar los elementos del carrito
        this.obtenerDatoComensal();
        this.actualizarPrecioTotal(productId);
        this.eliminoProducto = 1 ;
      },
      (error) => {
        console.error('Error al eliminar producto del carrito:', error);
        // Maneja el error según sea necesario
      }
    );
}

productoEliminado: number=0;
eliminoProducto=0;

actualizarPrecioTotal(productId: string) {
  console.log('Entramos a FUNCTION:', productId);
  // Obtener el subtotal del producto eliminado
  const productoEliminado = this.productos[productId];
  const costoUnidadEliminado = Number(productoEliminado.precio.$numberDecimal);
  const subtotalEliminado = costoUnidadEliminado * productoEliminado.cantidad;
  // Restar el subtotal del producto eliminado de la suma total
  this.sumaSubTotales -= subtotalEliminado;
  
  console.log('Suma de subtotales FUNCTION:', this.sumaSubTotales);
  console.log('BOUDELER:', this.eliminoProducto);
}


//-LOGICA CREACION DE ORDENES-------------------------------------------------------------------
realizarCompra() {
  // Agrupar productos por restaurante
  const productosPorRestaurante = this.agruparProductosPorRestaurante();

  // Para cada grupo de productos del mismo restaurante, crear una orden de pedido
  for (const restauranteId in productosPorRestaurante) {
    if (productosPorRestaurante.hasOwnProperty(restauranteId)) {
      const productos = productosPorRestaurante[restauranteId];
      this.crearOrdenParaRestaurante(productos);
    }
  }
}

agruparProductosPorRestaurante(): { [restauranteId: string]: any[] } {
  const productosPorRestaurante: { [restauranteId: string]: any[] } = {};

  // Agrupar productos por restaurante
  for (const producto of this.carritoConsulta) {
    if (!productosPorRestaurante[producto.idRestaurante]) {
      productosPorRestaurante[producto.idRestaurante] = [];
    }
    productosPorRestaurante[producto.idRestaurante].push(producto);
  }

  return productosPorRestaurante;
}

crearOrdenParaRestaurante(productos: any[]): void {
  // Verificamos que haya al menos un producto en el array
  if (productos.length > 0) {
    // Obtenemos el idRestaurante del primer producto
    const idRestaurante = productos[0].idRestaurante;
    
    // Luego, puedes utilizar idRestaurante en la lógica para crear la orden
    // Aquí estoy llamando a la función crearOrden y pasando idRestaurante
    this.crearOrden(idRestaurante, productos);
  }
}

idRepartidor: string = '000000000000000000000000';
noProductos1: number = 1;

// Modificamos crearOrden para que reciba idRestaurante como parámetro
crearOrden(idRestaurante: string, productos: any[]): void {
  const nuevaOrden = {
    idCliente: this.idCliente,
    idRestaurante: idRestaurante, // Utilizamos el idRestaurante pasado como parámetro
    idRepartidor: this.idRepartidor,
    idDireccion: this.idDireccion,
    idCuentaBanco:this.idCuentaBanco,
    costoEnvio: this.precioEnvio1,
    precioTotal: this.precioTotalGeneral
  };
  console.log('DATOS DE LA NUEVA ORDEN :',nuevaOrden);
  // Llama al servicio para enviar la nueva orden al backend
  this.authService.crearOrden(nuevaOrden).subscribe(
    (response) => {
      // Maneja la respuesta del backend según sea necesario
      console.log('Orden creada exitosamente:', response);
      // Restablece los valores de las propiedades para la próxima orden
      const orderId = response._id; // Obtiene el ID de la orden creada desde la respuesta del backend 
      console.log('Id de la nueva orden:', orderId);
      this.crearDetallesOrden(orderId, productos);// Llama a la función para crear los detalles de la orden, pasando el ID de la orden creada
      //this.logDeTransacciones(orderId, this.idCliente, "Pedido realizado");
      // Registra la transacción "Pedido realizado"
      this.logDeTransacciones(orderId);
      

    },
    (error) => {
      console.error('Error al crear la orden:', error);
      this.mostrarMensajeEmergente('Lo siento, no se pudo realizar la compra, intente de nuevo en unos minutos.', '');

    }
  );
}

logDeTransacciones(orderId: string): void {
  this.authService.logDeTransacciones("Pedido realizado", orderId, this.idCliente).subscribe(
    () => {
      console.log('Transacción de pedido realizada registrada correctamente en el backend');
    },
    (error) => {
      console.error('Error al registrar la transacción de pedido realizado:', error);
    }
  );
}

crearDetallesOrden(orderId: string, productos: any[]): void  {
  console.log('Detalle de orden llegando a funcion:', productos);
  // Verificar si se va a crear más de un detalle de orden
  if (productos.length > 1) {
    //console.log("Antes del if: ", this.noProductos1);
    this.noProductos1 = 2; // Cambiar el valor de noProductos1 si hay más de un producto
    //console.log("Despues del if: ", this.noProductos1);
  }
  //console.log("Cantidad fuera del if: ", this.noProductos1);

  productos.forEach(producto => {
    this.authService.obtenerInfoDeProductoPorId(producto.productId).subscribe(
      (data) => {

        // Extraer el costo unitario del producto
        const costoUnidad = Number(data.precio.$numberDecimal);
      
        console.log('DATA:', producto);
        // Calcular el subtotal
        const subtotal = costoUnidad * producto.cantidad;

        const detalle = {
          idOrden: orderId,
          idProducto: producto.productId,
          nombreProducto: data.nombre,
          descripcionProducto: data.descripcion,
          cantidadProducto: producto.cantidad,
          costoUnidad: data.precio,
          subtotal: subtotal,
          especificacion:producto.especificacion,
        };
        console.log('Detalle de orden creado exitosamente:', detalle);
        // Llama al servicio para enviar el nuevo detalle de la orden al backend
        // this.authService.crearDetalleOrden(detalle).subscribe(...);

        // Llama al servicio para enviar el nuevo detalle de la orden al backend
      this.authService.crearDetalleOrden(detalle).subscribe(
      (response) => {
        // Maneja la respuesta del backend según sea necesario
        console.log('Detalle de orden creado exitosamente:', response);
        //this.resetearValores();
        this.mostrarCompraExitosa = true;
        this.compraRealizada = true;

        if(this.noProductos1 === 2){
          this.actualizarCantidadProductos(orderId);
        }

      },
      (error) => {
        console.error('Error al crear el detalle de orden:', error);
       
        // Muestra un mensaje de error al usuario si es necesario
      this.mostrarMensajeEmergente('Lo siento, no se pudo realizar la compra, intente de nuevo en unos minutos2.', '');
        this.eliminarOrdenCreada(orderId);
          }
      );
      },
      (error) => {
        console.error('Error al obtener la información del producto:', error);
        // Maneja el error según sea necesario
      }
    );
    
    
  });
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

actualizarCantidadProductos(orderId: string) {
  this.authService.actualizarCantidadProductos(this.noProductos1, orderId)
    .subscribe(
      (response) => {
        console.log('No productos actualizado en la base de datos:', response);
        this.noProductos1 = 1;        
      },
      (error) => {
        console.error('Error al actualizar la cantidad en la base de datos Beto:', error);
        this.noProductos1 = 1;   
        // Maneja el error según sea necesario
      }
    );
}

//---------------------------------------------------------------------
  realizarCompra1() {
    this.mostrarCompraExitosa = true;
    this.compraRealizada = true;
    
  }
  seguirComprando() {
    this.router.navigateByUrl('/inicio-cliente');
    this.vaciarCarrito();
  }

  vaciarCarrito(): void {
    // Define un arreglo vacío para el carrito
    const carritoVacio: any[] = [];
    
    // Utiliza el servicio para reemplazar el carrito actual con el carrito vacío en la base de datos
    this.authService.actualizarCarrito(carritoVacio, this.comensalId).subscribe(
      (response) => {
        // Si la actualización se realiza correctamente, redirige al usuario a la página de inicio del cliente
        this.router.navigateByUrl('/inicio-cliente');
      },
      (error) => {
        // Maneja el error si la actualización del carrito falla
        console.error('Error al vaciar el carrito:', error);
        // Redirige al usuario a la página de inicio del cliente independientemente del error
        this.router.navigateByUrl('/inicio-cliente');
      }
    );
  }

}


