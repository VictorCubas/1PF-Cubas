import { Component } from '@angular/core';
import { Student } from '../../../alumnos/models';
import { Course } from '../../../courses/model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from '../../../alumnos/alumnos.service';
import { CoursesService } from '../../../courses/courses.service';
import { Inscripcion } from '../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inscripciones-details',
  templateUrl: './inscripciones-details.component.html',
  styleUrls: ['./inscripciones-details.component.scss']
})
export class InscripcionesDetailsComponent {
  alumno: Student | null = null;
  course: Course | null = null;
  inscripcion: Inscripcion | null = null;
  inscripcionId?: number;

  constructor(private activatedRoute:ActivatedRoute,
    private alumnosService: AlumnosService,
    private router: Router,
    private coursesService: CoursesService,
    private httpClient: HttpClient){

    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      this.router.navigate(['dashboard', 'students']);
    }
    else {
      this.inscripcionId = Number(this.activatedRoute.snapshot.params['id']);
      this.loadAlumno();
    }

    // this.courses$ = this.coursesService.getCoursesByStudentId(this.alumnoId || 0);   
  }


  loadAlumno(){
    if(this.inscripcionId){
      // console.log(environment.baseApiUrl + '/inscripciones?id=' + this.inscripcionId + '&_expand=course&_expand=student');
      this.httpClient.get<Course []>(environment.baseApiUrl + '/inscripciones?id=' + this.inscripcionId + '&_expand=course&_expand=student')
      .subscribe({
        next: (response) => {
          this.course = response[0]['course'];
          this.alumno = response[0]['student'];
        }
      });
      // this.alumnosService.getAlumnoById(this.inscripcionId).subscribe({
      //   next: (alumno) => this.alumno = alumno
      // });
    }
  }
}
