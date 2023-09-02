import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, mergeMap, take } from 'rxjs';
import { courses } from 'src/assets/data/courses.data';
import { Course } from './model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[];
  public courses$ = new BehaviorSubject<Course []>([]);

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

  // createCourse(alumno: Course): void{
  //   this.courses = [...this.courses, alumno];

  //   //emitimos
  //   this.courses$.next(this.courses);
  // }


  createCourse(course: Course):void{
    
    this.httpClient.post<Course>(environment.baseApiUrl + '/courses', {...course})
    .pipe(
      mergeMap((dataCreate) => this.courses$.pipe(
        take(1),
        map(
          (arrayActual) => [...arrayActual, dataCreate])
        )
      )
    ).subscribe({
      next: (nuevoArray) => {
        this.courses$.next(nuevoArray);
      }
    });
  }

  updateCourse(course: Course): void{
    this.httpClient.put(environment.baseApiUrl + '/courses/' + course.id, course)
    .subscribe({
      next: () => {}
    })
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
