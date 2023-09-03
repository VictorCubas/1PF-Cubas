import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CoursesActions } from './courses.actions';
import { Course } from '../model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class CoursesEffects {

  loadCoursess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CoursesActions.loadCourses),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getCoursesFromDB().pipe(
          //todo OK
          map(data => CoursesActions.loadCoursesSuccess({ data })),
          //not ok
          catchError(error => of(CoursesActions.loadCoursesFailure({ error }))))
      )
    );
  });

  private getCoursesFromDB(): Observable<Course[]>{
    return this.httpClient.get<Course []>(environment.baseApiUrl + '/courses');
  }

  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}
}
