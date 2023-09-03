import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { InscripcionesRoutingModule } from './inscripciones/inscripciones-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionesEffects } from './store/inscripciones.effects';
import { inscripcionesFeature } from './store/inscripciones.reducer';
import { StoreModule } from '@ngrx/store';
import { InscripcionesDialogComponent } from './components/inscripciones-dialog/inscripciones-dialog.component';
import { InscripcionesDetailsModule } from './pages/inscripciones-details/inscripciones-details.module';



@NgModule({
  declarations: [
    InscripcionesComponent,
    InscripcionesDialogComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    InscripcionesDetailsModule,
    SharedModule,
    StoreModule.forFeature(inscripcionesFeature),
    EffectsModule.forFeature([InscripcionesEffects])
  ]
})
export class InscripcionesModule { }
