import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from '../../alumnos.service';
import { Student } from '../../models';

@Component({
  selector: 'app-alumno-detail',
  templateUrl: './alumno-detail.component.html',
  styleUrls: ['./alumno-detail.component.scss']
})
export class AlumnoDetailComponent {
  alumnoId?: number;
  alumno: Student | null = null;

  
  constructor(private activatedRoute:ActivatedRoute,
        private alumnosService: AlumnosService,
        private router: Router){
    // this.activatedRoute.snapshot.params['id']

    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      this.router.navigate(['dashboard', 'students']);
    }
   else {
    this.alumnoId = Number(this.activatedRoute.snapshot.params['id']);
    this.loadAlumno();
    }
  }

  loadAlumno(){
    if(this.alumnoId){
      this.alumnosService.getAlumnoById(this.alumnoId).subscribe({
        next: (alumno) => this.alumno = alumno
      });
    }
  }
}
