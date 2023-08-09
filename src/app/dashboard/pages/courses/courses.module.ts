import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { UsersTableModule } from '../alumnos/components/users-table/users-table.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesDetailComponent } from './pages/courses-detail/courses-detail.component';

@NgModule({
  declarations: [CoursesComponent, CoursesDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UsersTableModule,
    CoursesRoutingModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
