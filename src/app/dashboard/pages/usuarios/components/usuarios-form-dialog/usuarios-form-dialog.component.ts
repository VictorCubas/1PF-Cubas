import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../users/models';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-usuarios-form-dialog',
  templateUrl: './usuarios-form-dialog.component.html',
  styleUrls: ['./usuarios-form-dialog.component.scss']
})
export class UsuariosFormDialogComponent {
  operation: string | null = 'Agregar';

  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(3),
  ]);

  surnameControl = new FormControl<string | null>(null, Validators.required);
  
  emailControl = new FormControl<string | null>(null,[
    Validators.required,
    Validators.email,
  ]);

  passwordControl = new FormControl<string | null>(null, Validators.required);

  rolControl = new FormControl<string | null>(null, Validators.required);

  userForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
    role: this.rolControl
  })

  constructor(
    private dialogRef: MatDialogRef<UsuariosFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: {userToEdit: User, operation: string},
    ){
      if(this.data){
        //estoy editando
        // console.log(this.data.userToEdit.role);
        this.nameControl.setValue(this.data.userToEdit.name);
        this.surnameControl.setValue(this.data.userToEdit.surname);
        this.emailControl.setValue(this.data.userToEdit.email);
        this.passwordControl.setValue(this.data.userToEdit.password);
        this.rolControl.setValue(this.data.userToEdit.role);
        this.operation = this.data.operation;
      }
  }

  onSubmit(): void{
    if(this.userForm.invalid){
      this.userForm.markAllAsTouched();
    }else{
      // console.log(this.userForm.value);

      const payload: any = {
        ...this.userForm.value
      }
    
      //se agrega el token a la data
      if(this.data?.userToEdit){
        // payload["token"] = this.data.userToEdit.token;
        // payload["courseId"] = this.data.userToEdit.courseId;
      }

      this.dialogRef.close(payload);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
