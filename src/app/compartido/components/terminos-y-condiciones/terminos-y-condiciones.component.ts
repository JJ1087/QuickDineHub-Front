import { Component } from '@angular/core';

@Component({
  selector: 'app-terminos-y-condiciones',
  templateUrl: './terminos-y-condiciones.component.html',
  styleUrl: './terminos-y-condiciones.component.css'
})
export class TerminosYCondicionesComponent {

  // Método para manejar el clic en los títulos de las secciones FAQ
  toggleFaqContent(event: Event) {
    const faqTitle = event.target as HTMLElement;
    const faqContent = faqTitle.nextElementSibling as HTMLElement;
    faqTitle.classList.toggle('collapsed');
    faqContent.classList.toggle('show');
  }
}
