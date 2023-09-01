import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, take } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscripcionesActions } from './inscripciones.actions';
import { HttpClient } from '@angular/common/http';
import { CreateInscripcionPayload, Inscripcion, InscripcionWithStudentAndCourse } from '../models';
import { environment } from 'src/environments/environment';
import { CoursesService } from '../../courses/courses.service';
import { Course } from '../../courses/model';
import { Student } from '../../alumnos/models';
import { Store } from '@ngrx/store';


@Injectable()
export class InscripcionesEffects {

  loadInscripcioness$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionesActions.loadInscripcioness),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getInscripcionesFromDB().pipe(
          //todo OK
          map(data => InscripcionesActions.loadInscripcionessSuccess({ data })),
          //not ok
          catchError(error => of(InscripcionesActions.loadInscripcionessFailure({ error }))))
      )
    );
  });


  loadCoursesOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionesActions.loadCourseOptions),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getCourseOptions().pipe(
          //todo OK
          map(data => InscripcionesActions.loadCourseOptionsSuccess({ data })),
          //not ok
          catchError(error => of(InscripcionesActions.loadCourseOptionsFailure({ error }))))
      )
    );
  });

  loadStudentsOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionesActions.loadStudentOptions),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getStudentOptions().pipe(
          //todo OK
          map(data => InscripcionesActions.loadStudentOptionsSuccess({ data })),
          //not ok
          catchError(error => of(InscripcionesActions.loadStudentOptionsFailure({ error }))))
      )
    );
  });


  createInscripcion$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionesActions.createInscripcion),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.createInscripcion(action.payload).pipe(
          //todo OK
          map(data => InscripcionesActions.createInscripcionSuccess({ data })),
          //not ok
          catchError(error => of(InscripcionesActions.createInscripcionFailure({ error }))))
      )
    );
  });

  createInscripcionesSuccess = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionesActions.createInscripcionSuccess),
      map(() => this.store.dispatch(InscripcionesActions.loadInscripcioness()))
    );
  },{dispatch: false}
  );


  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store) {

  }

  private getInscripcionesFromDB(): Observable<InscripcionWithStudentAndCourse []>{
    return this.httpClient.get<InscripcionWithStudentAndCourse []>(environment.baseApiUrl + '/inscripciones?_expand=course&_expand=student');
  }

  private getCourseOptions(): Observable<Course[]>{
    return this.httpClient.get<Course []>(environment.baseApiUrl + '/courses');
  }

  private getStudentOptions(): Observable<Student[]>{
    return this.httpClient.get<Student []>(environment.baseApiUrl + '/students');
  }


  private createInscripcion(payload: CreateInscripcionPayload): Observable<Inscripcion>{
    return this.httpClient.post<Inscripcion>(environment.baseApiUrl + '/inscripciones', payload);
  }


}
