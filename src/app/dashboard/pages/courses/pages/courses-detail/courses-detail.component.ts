import { Component } from '@angular/core';
import { Course } from '../../model';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../courses.service';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.scss']
})
export class CoursesDetailComponent {
  courseId?: number;
  course: Course | null = null;

  
  constructor(private activatedRoute:ActivatedRoute,
        private coursesService: CoursesService,
        private router: Router){
    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      this.router.navigate(['dashboard', 'courses']);
    }
   else {
    this.courseId = Number(this.activatedRoute.snapshot.params['id']);
    this.loadCourse();
    }
  }

  loadCourse(){
    if(this.courseId){
      this.coursesService.getCourseById(this.courseId).subscribe({
        next: (course) => this.course = course
      });
    }
  }
}
