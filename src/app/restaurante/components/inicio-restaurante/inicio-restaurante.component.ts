import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio-restaurante',
  templateUrl: './inicio-restaurante.component.html',
  styleUrl: './inicio-restaurante.component.css'
})
export class InicioRestauranteComponent {
  private synth!: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null!;

  nombreRestaurante: string | null = null;
  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage !== null) {
        // Verifica si 'window' está definido y 'localStorage' está disponible
        const restaurantId = localStorage.getItem('RESTAURANT_ID');
        if (restaurantId) {
            // Si 'RESTAURANT_ID' está presente en 'localStorage', asigna su valor a 'restauranteId'
            this.nombreRestaurante = localStorage.getItem('RESTAURANT_NAME');
        } else {
            console.error("No se encontró 'RESTAURANT_ID' en localStorage.");
        }
    } else {
        console.error("El entorno no admite 'localStorage'.");
    }
}
  

  toggleVozAlta() {
    const enableVozAlta = document.getElementById('enableVozAlta') as HTMLInputElement;
    this.synth = window.speechSynthesis;
  
    const elementos = document.querySelectorAll('a, img, h1,li, p, h2, .title, .option, label, button' );
  
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