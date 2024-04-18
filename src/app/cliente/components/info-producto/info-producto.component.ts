import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute para obtener parámetros de la URL
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-info-producto',
  templateUrl: './info-producto.component.html',
  styleUrl: './info-producto.component.css'
})

export class InfoProductoComponent implements OnInit {

  product: any;
  currentIndex = 0;
  autoPlayInterval: any;
  isMouseOverCarousel = false;

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('ID:', productId);
    if (productId) {
      // Llamar al servicio para obtener la información del producto por su ID
      this.authService.obtenerInfoDeProductoPorId(productId).subscribe(
        (data) => {
          this.product = data;
          console.log('Info del producto:', data);
          this.startAutoPlay(); // Comienza la reproducción automática del carrusel
        },
        (error) => {
          console.error('Error al obtener la información del producto:', error);
        }
      );
    } else {
      console.error('El ID del producto es nulo.');
    }
  }


  // images: string[] = [
  //   'assets/Hamburguesa.jpg',
  //   'assets/Tacos.jpg'
  //   // Agrega más rutas de imágenes según sea necesario
  // ];

  // prevImage() {
  //   this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  // }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.product.imagen.length) % this.product.imagen.length;
  }

  // nextImage() {
  //   this.currentIndex = (this.currentIndex + 1) % this.images.length;
  // }
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.product.imagen.length;
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextImage();
    }, 3000); // Cambia la imagen cada 3 segundos (ajusta según sea necesario)
  }



  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }


  // onMouseEnter() {
  //   this.stopAutoPlay();
  // }
  onMouseEnter() {
    this.isMouseOverCarousel = true;
    this.stopAutoPlay();
  }

  // onMouseLeave() {
  //   this.startAutoPlay();
  // }
  onMouseLeave() {
    this.isMouseOverCarousel = false;
    this.startAutoPlay();
  }
}
