import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent {
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

  rolControl = new FormControl<string | null>('ESTUDIANTE', Validators.required);

  userForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
    role: this.rolControl
  })

  constructor(
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: {userToEdit: Student, operation: string},
    ){
      if(this.data){
        this.nameControl.setValue(this.data.userToEdit.name);
        this.surnameControl.setValue(this.data.userToEdit.surname);
        this.emailControl.setValue(this.data.userToEdit.email);
        this.passwordControl.setValue(this.data.userToEdit.password);
        this.rolControl.setValue(this.data.userToEdit.role);
        this.operation = this.data.operation;
      }
  }

  onSubmit(): void{
    // alert(JSON.stringify(this.userForm.value));
    if(this.userForm.invalid){
      this.userForm.markAllAsTouched();
    }else{
      console.log(this.userForm.value);

      const payload: any = {
        ...this.userForm.value
      }
    
      //se agrega el token a la data
      if(this.data?.userToEdit){
        payload["token"] = this.data.userToEdit.token;
      }

      this.dialogRef.close(payload);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
