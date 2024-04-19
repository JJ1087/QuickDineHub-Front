import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  toggleFaqContent(event: Event) {
    const faqTitle = event.target as HTMLElement;
    const faqContent = faqTitle.nextElementSibling as HTMLElement;
    faqTitle.classList.toggle('collapsed');
    faqContent.classList.toggle('show');
  }
}
