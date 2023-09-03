import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesDetailsComponent } from './inscripciones-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    InscripcionesDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ]
})
export class InscripcionesDetailsModule { }
