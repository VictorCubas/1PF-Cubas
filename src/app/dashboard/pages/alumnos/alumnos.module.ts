import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AlumnoDetailComponent } from './pages/alumno-detail/alumno-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AlumnosComponent,
    UserFormDialogComponent,
    UsersTableComponent,
    ConfirmDialogComponent,
    AlumnoDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [AlumnosComponent]
})
export class AlmunosModule { }
