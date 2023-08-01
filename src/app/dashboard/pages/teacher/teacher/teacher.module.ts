import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
// import { UserFormDialogComponent } from '../../alumnos/components/user-form-dialog/user-form-dialog.component';
import { ConfirmDialogComponent } from '../../alumnos/components/confirm-dialog/confirm-dialog.component';
import { UsersTableComponent } from '../../alumnos/components/users-table/users-table.component';
import { UsersTableModule } from '../../alumnos/components/users-table/users-table.module';
// import { AlumnoDetailComponent } from '../../alumnos/pages/alumno-detail/alumno-detail.component';

@NgModule({
  declarations: [
    TeacherComponent,
    // UserFormDialogComponent,
    // UsersTableComponent,
    // ConfirmDialogComponent,
    // AlumnoDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UsersTableModule
  ],
  exports: [TeacherComponent]
})
export class TeacherModule { }
