import { createFeature, createReducer, on } from '@ngrx/store';
import { CoursesActions } from './courses.actions';
import { Course } from '../model';
import { courses } from 'src/assets/data/courses.data';

export const coursesFeatureKey = 'courses';

const courses_mock: Course[] = courses

export interface State {
  courses: Course[]
}

export const initialState: State = {
  courses: []
};

export const reducer = createReducer(
  initialState,
  
  on(CoursesActions.loadCourses, state => {
    return {
      courses: courses_mock
    }
  }),

);

export const coursesFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
});

