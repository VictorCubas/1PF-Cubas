import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InscripcionesComponent } from './inscripciones.component';
import { InscripcionesDetailsComponent } from '../pages/inscripciones-details/inscripciones-details.component';


const routes: Routes = [
  {
    path: '',
    component: InscripcionesComponent
  },
  {
    path: ':id',
    component: InscripcionesDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscripcionesRoutingModule { }
