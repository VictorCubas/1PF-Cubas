import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { InscripcionWithStudentAndCourse } from '../models';
import { Course } from '../../courses/model';
import { Student } from '../../alumnos/models';

export const inscripcionesFeatureKey = 'inscripciones';

export interface State {
  data: InscripcionWithStudentAndCourse[];
  courseOptions: Course[];
  studentOptions: Student[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  data: [],
  courseOptions: [],
  studentOptions: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(InscripcionesActions.loadInscripcioness, state => {
    return {
      ...state,
      loading: true,
    }
  }),

  on(InscripcionesActions.loadInscripcionessSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false,
    }
  }),

  on(InscripcionesActions.loadInscripcionessFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),


  //load courses options
  on(InscripcionesActions.loadCourseOptions, (state) => state),
  
  on(InscripcionesActions.loadCourseOptionsSuccess, (state, action) => {
    return {
      ...state,
      courseOptions: action.data
    }
  }),


  //load students options
  on(InscripcionesActions.loadStudentOptions, (state) => state),
  
  on(InscripcionesActions.loadStudentOptionsSuccess, (state, action) => {
    return {
      ...state,
      studentOptions: action.data
    }
  }),

  on(InscripcionesActions.deleteInscripcionSuccess, (state, action) => {
    return {
      ...state,
      inscripcion: action
    }
  }),
);

export const inscripcionesFeature = createFeature({
  name: inscripcionesFeatureKey,
  reducer,
});