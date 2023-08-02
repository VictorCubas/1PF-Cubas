import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { UsersTableModule } from '../alumnos/components/users-table/users-table.module';

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UsersTableModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
