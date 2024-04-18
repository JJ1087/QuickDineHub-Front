// chat.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private faq: { question: string, answer: string }[] = [
    { question: '¿Cómo hago un pedido?', answer: 'Para realizar un pedido, inicie sesión, explore los restaurantes y siga las instrucciones.' },
    { question: '¿Puedo programar un pedido para una hora específica?', answer: 'Sí, puede programar un pedido para una hora y fecha específicas. Durante el proceso de pedido, encontrará la opción para seleccionar la hora de entrega deseada.' },
    { question: '¿Qué hago si tengo problemas con mi pedido?', answer: 'Si enfrenta algún problema con su pedido, puede ponerse en contacto con nuestro equipo de soporte al cliente a través de la aplicación. Estamos aquí para ayudarlo a resolver cualquier problema.' },
    { question: '¿Cómo registro mi restaurante?', answer: 'Puede registrar su restaurante en la sección de registro de la plataforma.' },
    { question: '¿Cómo me convierto en un repartidor?', answer: 'Complete el proceso de registro y, una vez aprobado, estará listo para aceptar pedidos.' },
    { question: '¿Cómo puedo editar o agregar platos a mi menú?', answer: 'Puede administrar su menú en la sección de gestión de restaurantes. Allí, encontrará opciones para agregar, editar o eliminar elementos de su menú, incluyendo imágenes, descripciones y precios.' },

    // Agrega más preguntas frecuentes
  ];

  getFAQOptions(): string[] {
    return this.faq.map(item => item.question);
  }

  getResponse(selectedOption: string): string {
    const faqItem = this.faq.find(item => item.question === selectedOption);

    if (faqItem) {
      return faqItem.answer;
    }

    // Agrega aquí más lógica según tus necesidades

    return "Lo siento, no entendí la pregunta. ¿Puedes reformularla?";
  }
}
