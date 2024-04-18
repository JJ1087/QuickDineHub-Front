// bloqueo.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BloqueoService {
  private bloqueado: boolean = false;

  constructor() {}

  getBloqueado(): boolean {
    return this.bloqueado;
  }

  setBloqueado(bloqueado: boolean): void {
    this.bloqueado = bloqueado;
  }
}
