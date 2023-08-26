import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourses from './courses.reducer';
import { state } from '@angular/animations';

export const selectCoursesState = createFeatureSelector<fromCourses.State>(
  fromCourses.coursesFeatureKey
);

//corroborar esta parte
export const selectCourses = createSelector(
  selectCoursesState,
  state => state.courses
);

export const selectCourseDetailName = createSelector(
  selectCoursesState,
  state => state.courseDetail?.name
)