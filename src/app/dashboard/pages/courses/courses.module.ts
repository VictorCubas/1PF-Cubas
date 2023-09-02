import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesDetailComponent } from './pages/courses-detail/courses-detail.component';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './store/courses.effects';
import { StoreModule } from '@ngrx/store';
import { coursesFeature } from './store/courses.reducer';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { CoursesTableModule } from './components/courses-table/courses-table.module';

@NgModule({
  declarations: [CoursesComponent, CoursesDetailComponent, CourseFormDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CoursesTableModule,
    CoursesRoutingModule,
    StoreModule.forFeature(coursesFeature),
    EffectsModule.forFeature([CoursesEffects]),
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
