import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { UsersTableModule } from '../alumnos/components/users-table/users-table.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesDetailComponent } from './pages/courses-detail/courses-detail.component';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './store/courses.effects';
import { StoreModule } from '@ngrx/store';
import { coursesFeature } from './store/courses.reducer';

@NgModule({
  declarations: [CoursesComponent, CoursesDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UsersTableModule,
    CoursesRoutingModule,
    StoreModule.forFeature(coursesFeature),
    EffectsModule.forFeature([CoursesEffects]),
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
