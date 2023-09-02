import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../model';

@Component({
  selector: 'app-course-form-dialog',
  templateUrl: './course-form-dialog.component.html',
  styleUrls: ['./course-form-dialog.component.scss']
})
export class CourseFormDialogComponent {
  operation: string | null = 'Agregar';

  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(3),
  ]);

  descriptionControl = new FormControl<string | null>(null, Validators.required);

  dataForm = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
  })


  constructor(
    private dialogRef: MatDialogRef<CourseFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: {dataToEdit: Course, operation: string, isCourseModule: boolean},
    ){
      
      if(this.data){

        // console.log(this.data.dataToEdit.role);
        this.nameControl.setValue(this.data.dataToEdit.name);
        this.descriptionControl.setValue(this.data.dataToEdit.description);
        
        this.operation = this.data.operation;
      }
  }

  onSubmit(): void{
    // alert(JSON.stringify(this.dataForm.value));
    if(this.dataForm.invalid){
      this.dataForm.markAllAsTouched();
    }else{
      // console.log(this.dataForm.value);

      const payload: any = {
        ...this.dataForm.value
      }

      // console.log(payload);
    
      //se agrega el token a la data
      // if(this.data?.dataToEdit){

      //   if(!this.isCourseModule){
      //     payload["token"] = (this.data.dataToEdit as Student).token;
      //     payload["courseId"] = (this.data.dataToEdit as Student).courseId;
      //   }
      // }

      this.dialogRef.close(payload);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
