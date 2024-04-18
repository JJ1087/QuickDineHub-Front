import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail(emailDetails: {email: string, subject: string, text: string}) {
    return this.http.post('/api/send-email', emailDetails);
  }
}
