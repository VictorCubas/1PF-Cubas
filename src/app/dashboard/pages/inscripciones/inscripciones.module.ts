import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { InscripcionesRoutingModule } from './inscripciones/inscripciones-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    InscripcionesComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    SharedModule
  ]
})
export class InscripcionesModule { }
