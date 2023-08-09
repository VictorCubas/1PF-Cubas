import { Component } from '@angular/core';
import { Teacher } from '../../../model';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../../teacher.service';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent {
  teacherId?: number;
  teacher: Teacher | null = null;

  
  constructor(private activatedRoute:ActivatedRoute,
        private teacherService: TeacherService,
        private router: Router){
    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      this.router.navigate(['dashboard', 'teachers']);
    }
   else {
    this.teacherId = Number(this.activatedRoute.snapshot.params['id']);
    this.loadTeacher();
    }
  }

  loadTeacher(){
    if(this.teacherId){
      this.teacherService.getTeacherById(this.teacherId).subscribe({
        next: (teacher) => this.teacher = teacher
      });
    }
  }
}
