import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';

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

  userForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl
  })

  constructor(
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: {userToEdit: Student, operation: string},
    ){
      if(this.data){
        //estoy editando
        this.nameControl.setValue(this.data.userToEdit.name);
        this.surnameControl.setValue(this.data.userToEdit.surname);
        this.emailControl.setValue(this.data.userToEdit.email);
        this.passwordControl.setValue(this.data.userToEdit.password);
        this.operation = this.data.operation;
      }
  }

  onSubmit(): void{
    // alert(JSON.stringify(this.userForm.value));
    if(this.userForm.invalid){
      this.userForm.markAllAsTouched();
    }else{
      this.dialogRef.close(this.userForm.value)
    }
  }
}
