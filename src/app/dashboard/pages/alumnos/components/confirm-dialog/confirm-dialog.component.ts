import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  mensaje: string = '';
  titulo: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { //LO DEL ANY SE QUE ES MALA PRACTICA PERO EL APURO ME GANA :D
      this.mensaje = data.mensaje;
      this.titulo = data.titulo;
  }

  cancel(): void{
    this.dialogRef.close(false);
  }

  deleteData(): void{
    this.dialogRef.close(true);
  }
}
