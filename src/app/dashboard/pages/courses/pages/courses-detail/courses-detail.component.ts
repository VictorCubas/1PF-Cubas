import { Component, OnInit } from '@angular/core';
import { Course } from '../../model';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../courses.service';
import { AlumnosService } from '../../../alumnos/alumnos.service';
import { Student } from '../../../alumnos/models';
import { Store } from '@ngrx/store';
import { CoursesActions } from '../../store/courses.actions';
import { Observable } from 'rxjs';
import { selectCourseDetailName } from '../../store/courses.selectors';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.scss']
})
export class CoursesDetailComponent implements OnInit {
  courseId?: number = 0;
  course: Course | null = null;
  alumnos: Student [] = []

  courseName$: Observable<string | undefined>;

  displayedColumns = ['id', 'name', 'email'];

  
  constructor(private activatedRoute:ActivatedRoute,
        private coursesService: CoursesService,
        private router: Router,
        private alumnosService: AlumnosService,
        private store: Store){
    this.courseName$ = this.store.select(selectCourseDetailName)

    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      this.router.navigate(['dashboard', 'courses']);
    }
   else {
    this.courseId = Number(this.activatedRoute.snapshot.params['id']);
    //this.loadCourse();
    }
  }


  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourseDetail({ courseId: this.courseId || 0}))

   this.alumnosService.getAlumnosByCourseId(this.courseId || 0)
   .subscribe({
    next: (alumnos) => (this.alumnos = alumnos)
    })
  }

  loadCourse(){
    if(this.courseId){
      this.coursesService.getCourseById(this.courseId).subscribe({
        next: (course) => this.course = course
      });
    }
  }
}
