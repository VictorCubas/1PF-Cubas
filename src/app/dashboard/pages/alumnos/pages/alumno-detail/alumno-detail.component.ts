import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from '../../alumnos.service';
import { Student } from '../../models';
import { CoursesService } from '../../../courses/courses.service';
import { Course } from '../../../courses/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alumno-detail',
  templateUrl: './alumno-detail.component.html',
  styleUrls: ['./alumno-detail.component.scss']
})
export class AlumnoDetailComponent  {
  alumnoId?: number;
  alumno: Student | null = null;
  displayedColumns = ['id', 'name'];
  courses$: Observable<Course []>;

  
  constructor(private activatedRoute:ActivatedRoute,
        private alumnosService: AlumnosService,
        private router: Router,
        private coursesService: CoursesService){
    // this.activatedRoute.snapshot.params['id']

        if (!Number(this.activatedRoute.snapshot.params['id'])) {
          this.router.navigate(['dashboard', 'students']);
        }
        else {
          this.alumnoId = Number(this.activatedRoute.snapshot.params['id']);
          this.loadAlumno();
        }

      this.courses$ = this.coursesService.getCoursesByStudentId(this.alumnoId || 0);   
  }

  loadAlumno(){
    if(this.alumnoId){
      this.alumnosService.getAlumnoById(this.alumnoId).subscribe({
        next: (alumno) => this.alumno = alumno
      });
    }
  }
}
