import { createFeature, createReducer, on } from '@ngrx/store';
import { CoursesActions } from './courses.actions';
import { Course } from '../model';
import { courses } from 'src/assets/data/courses.data';
import { state } from '@angular/animations';

export const coursesFeatureKey = 'courses';

const courses_mock: Course[] = courses

export interface State {
  courses: Course[],
  courseDetail: Course | null
}

export const initialState: State = {
  courses: [],
  courseDetail: null
};

export const reducer = createReducer(
  initialState,
  
  on(CoursesActions.loadCourses, state => {
    return {
      ...state,
    }
  }),


  on(CoursesActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.data,
    }
  }),

  on(CoursesActions.loadCoursesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    }
  }),

  on(CoursesActions.loadCourseDetail, (state, action) => {
    return {
      ...state,
      courseDetail: courses_mock.find((c) => c.id === action.courseId) || null,
    }
  })
);

export const coursesFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
});

