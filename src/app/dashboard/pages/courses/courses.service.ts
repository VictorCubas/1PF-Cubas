import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, take } from 'rxjs';
import { courses } from 'src/assets/data/courses.data';
import { Course } from './model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[];
  private courses$ = new BehaviorSubject<Course []>([]);

  constructor(private httpClient: HttpClient) { 
    this.courses = courses;
    this.loadCourses();
  }

  loadCourses(): void{
    // this.courses$.next(this.courses)

    this.httpClient.get<Course []>(environment.baseApiUrl + '/courses')
    .subscribe({
      next: (response) => {
        this.courses$.next(response);
      }
    });
  }

  getCourses(): Subject<Course[]>{
    return this.courses$;
  }

  createCourse(alumno: Course): void{
    this.courses = [...this.courses, alumno];

    //emitimos
    this.courses$.next(this.courses);
  }

  updateCourse(course: Course): void{
    const index = this.courses.findIndex(a => a.id === course.id);

    if (index !== -1) {
      // Actualizar el estudiante en el array
      this.courses[index] = course;

      //emitimos
      this.courses$.next(this.courses);
    }
  }

  deleteCourseById(id: number): void{
    this.courses = this.courses.filter(course => course.id !== id);
    console.log(this.courses);

    //emitimos
    this.courses$.next(this.courses);
  }

  getCourseById(id: number): Observable<Course | null> {
    return this.courses$.pipe(
      map(courses => courses.find(course => course.id === id) || null),
      take(1)
    );
  }
  
}
