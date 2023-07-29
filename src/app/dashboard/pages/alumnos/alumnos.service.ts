import { Injectable } from '@angular/core';
import { alumnos } from 'src/assets/data/alumnos.data';
import { Student } from './models';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private alumnos: Student[];
  private alumnos$ = new BehaviorSubject<Student []>([]);

  constructor() { 
    this.alumnos = alumnos;
    this.loadAlumnos();
  }

  loadAlumnos(): void{
    this.alumnos$.next(this.alumnos)
  }

  getAlumnos(): Subject<Student[]>{
    return this.alumnos$;
  }

  createAlumno(alumno: Student): void{
    this.alumnos = [...this.alumnos, alumno];
    this.alumnos$.next(this.alumnos);
  }
}
