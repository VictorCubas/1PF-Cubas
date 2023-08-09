import { NgModule } from '@angular/core';
import { AlumnoDetailComponent } from './pages/alumno-detail/alumno-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos.component';

const routes: Routes = [
  {
    path: '',
    component: AlumnosComponent
  },
  {
    path: ':id',
    component: AlumnoDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
