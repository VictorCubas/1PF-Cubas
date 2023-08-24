import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourses from './courses.reducer';

export const selectCoursesState = createFeatureSelector<fromCourses.State>(
  fromCourses.coursesFeatureKey
);

//corroborar esta parte
export const selectCourses = createSelector(
  selectCoursesState,
  state => state.courses
);