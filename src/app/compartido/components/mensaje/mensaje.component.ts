import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';




@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrl: './mensaje.component.css'
})
export class MensajeComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MensajeComponent>
  ){
    
  }

  cerrarDialog(){
    if (this.data.redireccion) {
      window.location.href = this.data.redireccion;
    }
    this.dialogRef.close();
  }
}

