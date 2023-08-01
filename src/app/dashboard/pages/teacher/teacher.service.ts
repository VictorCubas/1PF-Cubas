
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, take } from 'rxjs';
import { Teacher } from './model';
import { teachers } from 'src/assets/data/teachers.data';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private teachers: Teacher[];
  private teachers$ = new BehaviorSubject<Teacher []>([]);

  constructor() { 
    this.teachers = teachers;
    this.loadTeachers();
  }

  loadTeachers(): void{
    this.teachers$.next(this.teachers)
  }

  getTeachers(): Subject<Teacher[]>{
    return this.teachers$;
  }

  createTeacher(alumno: Teacher): void{
    this.teachers = [...this.teachers, alumno];

    //emitimos
    this.teachers$.next(this.teachers);
  }

  updateTeacher(alumno: Teacher): void{
    const index = this.teachers.findIndex(a => a.id === alumno.id);

    if (index !== -1) {
      // Actualizar el estudiante en el array
      this.teachers[index] = alumno;

      //emitimos
      this.teachers$.next(this.teachers);
    }
  }

  deleteTeacherById(id: number): void{
    this.teachers = this.teachers.filter(alumno => alumno.id !== id);
    console.log(this.teachers);

    //emitimos
    this.teachers$.next(this.teachers);
  }

  getTeacherById(id: number): Observable<Teacher | null> {
    return this.teachers$.pipe(
      map(teachers => teachers.find(alumno => alumno.id === id) || null),
      take(1)
    );
  }
  
}
