// rest-productos.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthrestauranteService } from '../../services/authrestaurante.service';
import { MensajeComponent } from '../../../compartido/components/mensaje/mensaje.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-rest-productos',
  templateUrl: './rest-productos.component.html',
  styleUrls: ['./rest-productos.component.css']  // Corrige la propiedad styleUrl a styleUrls
})
export class RestProductosComponent implements OnInit {
  idproducto: string = '';

  restauranteId: string | null = null;
  showFormulario: boolean = false;
  imagenes: File[] = [];
  nombre: string = '';
  descripcion: string = '';
  categoria: string = '';
  tiempoP: string = '';
  precio: string = '';
  etiquetas: string[] = ['Desayuno', 'Almuerzo', 'Cena', 'Comida Rapida', 'Vegetariana', 'Asiatica', 'Postres', 'helados', 'congelados', 'pays', 'carnes', 'dulce'];
  etiquetasSeleccionadas: { [key: string]: boolean } = {};
  productos: any[] = [];
  editandoProducto: boolean = false;
  indiceProductoAEditar: number | null = null;

  constructor(public dialog: MatDialog,
  private authRestauranteService: AuthrestauranteService,
  ) { }
  private synth!: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null!;
  

  ngOnInit(): void {
    // Verificar si 'window' está definido antes de usarlo
    if (typeof window !== 'undefined') {
      // Verifica si 'localStorage' está disponible en el entorno actual
      const restaurantId = localStorage.getItem('RESTAURANT_ID');
      if (restaurantId) {
          // Si 'RESTAURANT_ID' está presente en 'localStorage', asigna su valor a 'restauranteId'
          this.restauranteId = restaurantId;
          // Luego, procede con el resto de la inicialización del componente
          this.obtenerProductos();
      } else {
          console.error("No se encontró 'RESTAURANT_ID' en localStorage.");
      }
  } else {
      console.error("El entorno no admite 'localStorage'.");
  }
  }
  

  //Capturar Imagen
  capturarImagenPrincipal(event: any): void {
    const imagenPrincipal = event.target.files[0];
    if (imagenPrincipal) {
        if (this.validarTipoYTamano(imagenPrincipal)) {
            this.imagenes[0] = imagenPrincipal;
        } else {
            // Mostrar un mensaje de error o realizar alguna acción si el archivo no cumple con los requisitos
            console.log("Error: La imagen principal debe ser de tipo JPEG o PNG y tener un tamaño máximo de 2MB.");
            alert('La imagen debe de ser en formato jpg o png y no mayor a 6MG  ');
          }
    }
}

capturarImagenesExtras(event: any): void {
    const imagenesExtras = event.target.files;
    for (let i = 0; i < imagenesExtras.length; i++) {
        if (i + 1 <= 3) { // Limita a 3 imágenes extras
            if (this.validarTipoYTamano(imagenesExtras[i])) {
                this.imagenes[i + 1] = imagenesExtras[i];
            } else {
                // Mostrar un mensaje de error o realizar alguna acción si el archivo no cumple con los requisitos
                console.log("Error: Las imágenes extras deben ser de tipo JPEG o PNG y tener un tamaño máximo de 2MB.");
                alert('La imagen debe de ser en formato jpg o png y no mayor a 6MB  ');
              }
        } else {
            break; // Rompe el bucle si ya se han seleccionado 3 imágenes
        }
    }
    console.log('Imágenes seleccionadas:', this.imagenes);
}

validarTipoYTamano(archivo: File): boolean {
    const tipoPermitido = ['image/jpeg', 'image/png']; // Tipos de archivo permitidos
    const tamañoMaximo = 6 * 1024 * 1024; // 6MB

    return tipoPermitido.includes(archivo.type) && archivo.size <= tamañoMaximo;
}

  getImagenURL(imagenes: File): string {
    return URL.createObjectURL(imagenes);
  }

//VOZ
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
//MOSTRAR FORMULARIO
  toggleFormulario(): void {
    console.log('Toggle Formulario Clicked');
    this.showFormulario = !this.showFormulario;
    this.limpiarFormulario();
  }

  publicarProducto(): void {
    const confirmation = confirm("¿Estas seguro de crear un nuevo producto?");
    if (confirmation) {
    // Validar campos vacíos
    if (this.camposVacios() || this.restauranteId === null) {
      alert('Todos los campos son obligatorios. Por favor, completa la información del producto.');
      return;
    }

    // Validar número negativo en el precio
    if (parseFloat(this.precio) < 30) {
      alert('El precio del producto no puede ser menor a 30');
      return;
    }
    // Validar tiempo
    if (parseFloat(this.tiempoP) < 0) {
      alert('El Tiempo no puede ser un número negativo.');
      return;
    }

    const nuevoProducto = {
      
      imagen: this.imagenes,
      nombre: this.nombre,
      descripcion: this.descripcion,
      categoria: this.categoria,
      tiempoP: this.tiempoP,
      precio: this.precio,
      etiquetas: this.obtenerEtiquetasSeleccionadas().join(','), // Convertir el array de etiquetas a una cadena separada por comas
    };

    // Si estamos editando un producto, actualizamos el producto existente
    if (this.editandoProducto && this.indiceProductoAEditar != null) {
      this.productos[this.indiceProductoAEditar] = nuevoProducto;
    } else {
      // Agregar la imagen al producto
      this.productos.push(nuevoProducto);
    }

//form data de producto
    const NuevoProducto = new FormData();
    NuevoProducto.append('idRestaurante', this.restauranteId);
    NuevoProducto.append('nombre', this.nombre);
    NuevoProducto.append('descripcion', this.descripcion);
    NuevoProducto.append('categoria', this.categoria);
    NuevoProducto.append('tiempoP', this.tiempoP);
    NuevoProducto.append('precio', this.precio);
    NuevoProducto.append('etiquetas',JSON.stringify(this.obtenerEtiquetasSeleccionadas()));
  // Agregar imágenes al FormData
  this.imagenes.forEach((imagen) => {
    NuevoProducto.append(`imagen`, imagen);
  });
  
  NuevoProducto.forEach((value, key) => {
    console.log(`${key}:`, value);
  });
  //Enviar Producto
  this.authRestauranteService.CrearProducto(NuevoProducto).subscribe(
    (response) => {
      console.log('Respuesta del servidor:', response);
      this.obtenerProductos();
      this.mostrarMensajeEmergente('PLATILLO REGISTRADO CORRECTAMENTE', '');
      
    },
    (error) => {
      console.error('Error al subir el producto:', error);
      
      this.mostrarMensajeEmergente('ERROR AL REGISTRAR', '');
    }
  );

    this.limpiarFormulario();
    this.toggleFormulario();
    this.editandoProducto = false;
    this.indiceProductoAEditar = null;
  }
}
  private camposVacios(): boolean {
    return (
      !this.imagenes ||
      !this.nombre ||
      !this.descripcion ||
      !this.tiempoP ||
      !this.categoria ||
      !this.precio ||
      this.obtenerEtiquetasSeleccionadas().length === 0
    );
  }

  private obtenerEtiquetasSeleccionadas(): string[] {
    const etiquetasSeleccionadas: string[] = [];
    for (const etiqueta in this.etiquetasSeleccionadas) {
      if (this.etiquetasSeleccionadas[etiqueta]) {
        etiquetasSeleccionadas.push(etiqueta);
      }
    }
    return etiquetasSeleccionadas;
  }

  cancelarPublicacion(): void {
    this.limpiarFormulario();
    this.toggleFormulario();
    this.editandoProducto = false;
    this.indiceProductoAEditar = null;
  }

  limpiarFormulario(): void {
    this.imagenes = [];
    this.nombre = '';
    this.descripcion = '';
    this.categoria = '';
    this.tiempoP = '';
    this.precio = '';
    this.etiquetas.forEach(etiqueta => {
      this.etiquetasSeleccionadas[etiqueta] = false;
    });
  }

  editarProducto(index: number): void {
    console.log('Editar producto en el índice:', index);
    const productoAEditar = this.productos[index];

    // Carga la información del producto en el formulario
    this.imagenes = productoAEditar.imagen;
    this.nombre = productoAEditar.nombre;
    this.descripcion = productoAEditar.descripcion;
    this.categoria = productoAEditar.categoria;
    this.precio = productoAEditar.precio;
    this.tiempoP = productoAEditar.tiempoP,
    // Actualiza el estado de las etiquetas seleccionadas según el producto
    this.etiquetasSeleccionadas = {};
productoAEditar.etiquetas.forEach((etiqueta: string) => {
  this.etiquetasSeleccionadas[etiqueta] = true;
});

    

    // Muestra el formulario con la información cargada
    this.showFormulario = true;
    this.editandoProducto = true;
    this.indiceProductoAEditar = index;
  }


  eliminarProducto(index: number): void {
    const confirmation = confirm("¿Estás seguro de elimiar el producto?");
    if (confirmation) {
    console.log('Eliminar producto en el índice:', index);
    const productoeliminar = this.productos[index];
    this.idproducto = productoeliminar._id;
   
    console.log('ID PRODUCTO:', this.idproducto);
    // Elimina el producto del arreglo productos basado en el índice
    this.productos.splice(index, 1);

    this.authRestauranteService.eliminarProducto(this.idproducto).subscribe(
      (response) => {
        console.log('Producto eliminado correctamente:', response);
        this.mostrarMensajeEmergente('Producto eliminado correctamente', '');
        // Muestra un mensaje o realiza alguna acción adicional si es necesario
      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
        // Maneja el error de acuerdo a tus necesidades
      }
    );
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

  obtenerProductos(): void {
    this.authRestauranteService.getProductos(this.restauranteId).subscribe(
  (productos) => {
    this.productos = productos;
    this.productos.forEach(producto => {
      // Verifica si el producto tiene etiquetas
      if (producto.etiquetas) {
        // Parsea la cadena JSON de etiquetas a un arreglo
        const etiquetasArray = JSON.parse(producto.etiquetas);
        // Asigna el arreglo de etiquetas al producto
        producto.etiquetas = etiquetasArray;
      } else {
        // Si el producto no tiene etiquetas, asigna un arreglo vacío
        producto.etiquetas = [];
      }
    });
  },
  (error) => {
    console.error('Error al obtener los productos:', error);
  }
);
  }
    // Método para generar la URL completa de la imagen
    getImageUrl(relativePath: string): string {
      return `http://localhost:3000/${relativePath}`;
    }

    formatTiempoPreparacion(tiempoMinutos: number): string {
      const horas = Math.floor(tiempoMinutos / 60);
      const minutos = tiempoMinutos % 60;
      return `${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos} hrs`;
  }
}
