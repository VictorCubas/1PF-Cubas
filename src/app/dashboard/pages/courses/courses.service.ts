import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, forkJoin, map, mergeMap, take } from 'rxjs';
import { courses } from 'src/assets/data/courses.data';
import { Course } from './model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { CoursesActions } from './store/courses.actions';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[];
  public courses$ = new BehaviorSubject<Course []>([]);

  constructor(
      private httpClient: HttpClient,
      private store: Store) { 
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
        //se carga nuevamente los courses
        this.store.dispatch(CoursesActions.loadCourses());
      }
    });
  }

  updateCourse(course: Course): void{
    this.httpClient.put(environment.baseApiUrl + '/courses/' + course.id, course)
    .subscribe({
      next: () => {
        this.store.dispatch(CoursesActions.loadCourses());
      }
    })
  }

  deleteCourseById(id: number): void{
    // this.courses = this.courses.filter(course => course.id !== id);
    // console.log(this.courses);

    // //emitimos
    // this.courses$.next(this.courses);

    this.httpClient.delete(environment.baseApiUrl + '/courses/' + id)
    .subscribe({
      next: () => {this.store.dispatch(CoursesActions.loadCourses());}
    })
  }

  getCourseById(id: number): Observable<Course | null> {
    return this.courses$.pipe(
      map(courses => courses.find(course => course.id === id) || null),
      take(1)
    );
  }


  getCoursesByStudentId(studentId: number): Observable<Course[]> {
    const inscripcionesUrl = environment.baseApiUrl + `/inscripciones?studentId=${studentId}`;

    return this.httpClient.get<any[]>(inscripcionesUrl).pipe(
      mergeMap(inscripciones => {
        const observables = inscripciones.map(inscripcion => {
          const studentsUrl = environment.baseApiUrl + `/courses/${inscripcion.courseId}`;
          return this.httpClient.get<Course>(studentsUrl);
        });
        return forkJoin(observables);
      })
    );
  }
  
}
