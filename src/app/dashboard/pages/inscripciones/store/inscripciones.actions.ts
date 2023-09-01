import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateInscripcionPayload, Inscripcion, InscripcionWithStudentAndCourse } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from '../../courses/model';
import { Student } from '../../alumnos/models';

export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: {
    'Load Inscripcioness': emptyProps(),
    'Load Inscripcioness Success': props<{ data: InscripcionWithStudentAndCourse[] }>(),
    'Load Inscripcioness Failure': props<{ error: HttpErrorResponse }>(),

    'Load Course Options': emptyProps(),
    'Load Course Options Success': props<{data: Course []}>(),
    'Load Course Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load Student Options': emptyProps(),
    'Load Student Options Success': props<{data: Student []}>(),
    'Load Student Options Failure': props<{ error: HttpErrorResponse }>(),

    'Create Inscripcion': props<{payload: CreateInscripcionPayload}>(),
    'Create Inscripcion Success': props<{data: Inscripcion}>(),
    'Create Inscripcion Failure': props<{error: HttpErrorResponse}>(),
  }
});
