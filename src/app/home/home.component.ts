 /*home.component.ts */
 import { Component, OnInit, HostListener } from '@angular/core';
 declare var SpeechSynthesis: any;

 @Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrl: './home.component.css'
 })
 
 export class HomeComponent implements OnInit {
   private synth!: SpeechSynthesis;
   private utterance: SpeechSynthesisUtterance | null = null!;
   scrolledDown = false;
   
   ngOnInit(): void {
    if (typeof window !== 'undefined') {
      // Coloca aquí el código que utiliza window
    }
  }
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Verifica si el usuario ha hecho scroll hacia abajo
    this.scrolledDown = window.scrollY > 0;

    // Lógica para manejar la aparición de los elementos
    this.checkScroll();
  }

  checkScroll() {
    const componentes = document.querySelectorAll('.restaurantes-section, .clientes-section, .chatbot-section');

    componentes.forEach(comp => {
      const position = comp.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;

      if (position < screenHeight * 0.75) {
        comp.classList.add('visible');
      } else {
        comp.classList.remove('visible');
      }
    });
  }
   // Función para habilitar/deshabilitar la lectura en voz alta al pasar el ratón
   toggleVozAlta() {
    const enableVozAlta = document.getElementById('enableVozAlta') as HTMLInputElement;
    this.synth = window.speechSynthesis;
  
    const elementos = document.querySelectorAll('a, img, h1, p, h2, .title, span, .option');
  
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