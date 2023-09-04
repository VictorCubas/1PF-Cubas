import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosTableComponent } from './usuarios-table.component';
import { RouterModule } from '@angular/router';
import { share } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    UsuariosTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    UsuariosTableComponent
  ]
})
export class UsuariosTableModule { }
