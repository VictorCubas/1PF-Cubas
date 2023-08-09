import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { UsersTableModule } from '../../alumnos/components/users-table/users-table.module';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherDetailComponent } from './pages/teacher-detail/teacher-detail.component';

@NgModule({
  declarations: [
    TeacherComponent,
    TeacherDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UsersTableModule,
    TeacherRoutingModule
  ],
  exports: [TeacherComponent]
})
export class TeacherModule { }
