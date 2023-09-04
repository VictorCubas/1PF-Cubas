import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { Course } from './model';
import { CoursesService } from './courses.service';
import { UserFormDialogComponent } from '../alumnos/components/user-form-dialog/user-form-dialog.component';
import { ConfirmDialogComponent } from '../alumnos/components/confirm-dialog/confirm-dialog.component';
import { Store } from '@ngrx/store';
import { CoursesActions } from './store/courses.actions';
import { selectCourses, selectCoursesState } from './store/courses.selectors';
import { selectIsAdmin } from 'src/app/store/auth.actions.ts/auth.selectos';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { ToolbarTitleService } from '../../layout/toolbar/toolbar-title.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit{
  public destroyed = new Subject<boolean>();
  coursesAsync: Observable<Course[]>;
  numeroCourses: number = 0;
  public isAdmin$: Observable<boolean>;

  constructor(
    private madDialog: MatDialog,
    private coursesService: CoursesService,
    private store: Store,
    private toolbarTitleService: ToolbarTitleService){
      this.toolbarTitleService.setTitle('cursos');
      this.coursesAsync = this.store.select(selectCourses);
      this.isAdmin$ = this.store.select(selectIsAdmin);

      this.coursesAsync
      .pipe(
        map((courses) => courses.length),
        takeUntil(this.destroyed)
      )
      .subscribe((length) => {
        this.numeroCourses = length;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses());
  }

  onCreateCourse(): void{
    const isCourseModule = true;

    const  dialogRef = this.madDialog.open(CourseFormDialogComponent,{
    });

    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if(v){
          const nuevoCourse: Course = {
              id: this.numeroCourses + 1,
              name: v.name,
              description: v.description
          }

          // console.log(nuevoCourse)
           this.coursesService.createCourse(nuevoCourse);
        }
      }
    });
  }

  onDeleteCourse(courseToDelete: Course): void {
    const dialogRef = this.madDialog.open(ConfirmDialogComponent, {
      width: '370px',
      data: { mensaje: `¿Estás seguro que quieres eliminar a este curso (${courseToDelete.name?.toUpperCase()}) 
            de la lista? 
            AL ELIMINAR ESTE CURSO TAMBIEN SE ELIMINARA LAS INSCRIPCIONES DEL MISMO`,
            titulo: 'Confirmación de eliminación'}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coursesService.deleteCourseById(courseToDelete.id);
      }
    });
  }


  onEditCurse(dataToEdit: Course): void{
    // console.log(dataToEdit)

    const dialogRef = this.madDialog.open(CourseFormDialogComponent,  {
      data : {
        dataToEdit: dataToEdit,
        operation: 'Editar'
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (dataUpdate) => {

        // console.log(dataUpdate);
        if(dataUpdate){
          this.coursesService.updateCourse({'id': dataToEdit.id ,...dataUpdate});
        }
      }
    })
  }
}
