import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from '../../store/inscripciones.actions';
import { Observable } from 'rxjs';
import { Course } from '../../../courses/model';
import { selectCourseOptions, selectStudentOptions } from '../../store/inscripciones.selectors';
import { Student } from '../../../alumnos/models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inscripciones-dialog',
  templateUrl: './inscripciones-dialog.component.html',
  styles: [
  ]
})
export class InscripcionesDialogComponent implements OnInit {
  courseIdControl = new FormControl(null, Validators.required);
  studentIdControl = new FormControl(null, Validators.required);
  courseOptions$: Observable<Course[]>;
  studentOptions$: Observable<Student[]>;

  inscripcionForm = new FormGroup({
    studentId: this.studentIdControl,
    courseId: this.courseIdControl,
  });

  constructor(private store: Store, private matDialogRef: MatDialogRef<InscripcionesDialogComponent>){
    this.courseOptions$ = this.store.select(selectCourseOptions);
    this.studentOptions$ = this.store.select(selectStudentOptions);
  }

  ngOnInit(): void {
      this.store.dispatch(InscripcionesActions.loadCourseOptions());
      this.store.dispatch(InscripcionesActions.loadStudentOptions());
  }

  onSubmit(): void{
    if(this.inscripcionForm.invalid){
      this.inscripcionForm.markAllAsTouched();
    }
    else{
      // console.log(this.inscripcionForm.getRawValue());
      this.store.dispatch(InscripcionesActions.createInscripcion({payload: this.inscripcionForm.getRawValue()}))
      this.matDialogRef.close();
    }
  }
}
