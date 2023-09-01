import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscripciones from './inscripciones.reducer';

export const selectInscripcionesState = createFeatureSelector<fromInscripciones.State>(
  fromInscripciones.inscripcionesFeatureKey
);


export const selectInscripciones = createSelector(selectInscripcionesState, (state) => state.data)

export const selectCourseOptions = createSelector(selectInscripcionesState, (state) => state.courseOptions)

export const selectStudentOptions = createSelector(selectInscripcionesState, (state) => state.studentOptions)