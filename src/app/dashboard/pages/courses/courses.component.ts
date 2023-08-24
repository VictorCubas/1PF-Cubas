import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, map, tap } from 'rxjs';
import { Course } from './model';
import { CoursesService } from './courses.service';
import { UserFormDialogComponent } from '../alumnos/components/user-form-dialog/user-form-dialog.component';
import { ConfirmDialogComponent } from '../alumnos/components/confirm-dialog/confirm-dialog.component';
import { Store } from '@ngrx/store';
import { CoursesActions } from './store/courses.actions';
import { selectCourses, selectCoursesState } from './store/courses.selectors';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit{
  public destroyed = new Subject<boolean>();
  coursesAsync: Observable<Course[]>;
  numeroCourses: number = 0;

  constructor(
    private madDialog: MatDialog,
    private coursesService: CoursesService,
    private store: Store){
      //  this.coursesAsync = this.store.select(selectCoursesState);
      this.coursesAsync = this.store.select(selectCourses);
        // this.coursesAsync = this.coursesService.getCourses().pipe(
        //   map(courses => courses.map(curso => ({
        //     ...curso, // Mantenemos todas las propiedades del curso original
        //     name: curso.name.toUpperCase() // Modificamos solo la propiedad "name"
        //   }))),
        //   tap(courses => {
        //     this.numeroCourses = courses.length;
        //   })
        // );
  }
  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses());
  }

  onCreateUser(): void{
    const  dialogRef = this.madDialog.open(UserFormDialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if(v){
          const nuevoCourse: Course = {
              id: this.numeroCourses + 1,
              name: v.name,
              email: v.email,
              password: v.password,
              surname: v.surname
          }

          this.coursesService.createCourse(nuevoCourse);
        }
      }
    });
  }

  onDeleteUser(userToDelete: Course): void {
    const dialogRef = this.madDialog.open(ConfirmDialogComponent, {
      width: '370px',
      data: { mensaje: `¿Estás seguro que quieres eliminar a este curso (${userToDelete.name?.toUpperCase()}) de la lista?`,
            titulo: 'Confirmación de eliminación'}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coursesService.deleteCourseById(userToDelete.id);
      }
    });
  }


  onEditUser(userToEdit: Course): void{
    console.log(userToEdit)

    const dialogRef = this.madDialog.open(UserFormDialogComponent,  {
      data : {
        userToEdit: userToEdit,
        operation: 'Editar'
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (dataUpdate) => {

        if(dataUpdate){
          this.coursesService.updateCourse({'id': userToEdit.id ,...dataUpdate});
        }
      }
    })
  }
}
