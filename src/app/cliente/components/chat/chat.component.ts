// chat.component.ts

import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  options: string[] = [];
  selectedOption: string = '';
  chatHistory: { user: string, bot: string }[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.options = this.chatService.getFAQOptions();
  }

  onSelectOption() {
    const userMessage = this.selectedOption;
    const botResponse = this.chatService.getResponse(userMessage);
    
    this.chatHistory.push({ user: userMessage, bot: botResponse });
    this.selectedOption = ''; // Limpiar la opción seleccionada después de procesarla
  }
}
