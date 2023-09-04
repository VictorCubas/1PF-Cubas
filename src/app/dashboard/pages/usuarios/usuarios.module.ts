import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuariosFormDialogComponent } from './components/usuarios-form-dialog/usuarios-form-dialog.component';
import { UsuariosTableModule } from './components/usuarios-table/usuarios-table.module';



@NgModule({
  declarations: [
    UsuariosComponent,
    UsuariosFormDialogComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    UsuariosTableModule
  ]
})
export class UsuariosModule { }
