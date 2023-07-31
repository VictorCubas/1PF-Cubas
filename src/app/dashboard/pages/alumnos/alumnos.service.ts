import { Injectable } from '@angular/core';
import { alumnos } from 'src/assets/data/alumnos.data';
import { Student } from './models';
import { BehaviorSubject, Observable, Subject, map, take } from 'rxjs';

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

    //emitimos
    this.alumnos$.next(this.alumnos);
  }

  updateAlumno(alumno: Student): void{
    const index = this.alumnos.findIndex(a => a.id === alumno.id);

    if (index !== -1) {
      // Actualizar el estudiante en el array
      this.alumnos[index] = alumno;

      //emitimos
      this.alumnos$.next(this.alumnos);
    }
  }

  deleteAlumnoById(id: number): void{
    this.alumnos = this.alumnos.filter(alumno => alumno.id !== id);
    console.log(this.alumnos);

    //emitimos
    this.alumnos$.next(this.alumnos);
  }

  getAlumnoById(id: number): Observable<Student | null> {
    return this.alumnos$.pipe(
      map(alumnos => alumnos.find(alumno => alumno.id === id) || null),
      take(1)
    );
  }
  
}
