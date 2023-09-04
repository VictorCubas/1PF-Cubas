import { Component } from '@angular/core';
import { User } from '../users/models';
import { Observable, Subject, map, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AlumnosService } from '../alumnos/alumnos.service';
import { UsuariosFormDialogComponent } from './components/usuarios-form-dialog/usuarios-form-dialog.component';
import { generateRandomString } from 'src/app/shared/utils/helpers';
import { ConfirmDialogComponent } from '../alumnos/components/confirm-dialog/confirm-dialog.component';
import { UsuariosService } from './usuarios.service';
import { ToolbarTitleService } from '../../layout/toolbar/toolbar-title.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  public destroyed = new Subject<boolean>();
  usuariosAsync: Observable<User[]>;
  numeroUsuarios: number = 0;
  
    constructor(
      private madDialog: MatDialog,
      private usuariosService: UsuariosService,
      private toolbarTitleService: ToolbarTitleService){
          this.toolbarTitleService.setTitle('usuarios');
          this.usuariosAsync = this.usuariosService.getUsuarios().pipe(
            map(usuarios => usuarios.map(usuario => ({
              ...usuario, // Mantenemos todas las propiedades del alumno original
              name: usuario.name.toUpperCase() // Modificamos solo la propiedad "name"
            }))),
            tap(usuarios => {
              this.numeroUsuarios = usuarios.length;
            })
          );
    }

    onCreateUser(): void{
      const  dialogRef = this.madDialog.open(UsuariosFormDialogComponent);

      dialogRef.afterClosed().subscribe({
        next: (v) => {
          if(v){
            const token = generateRandomString(20);
            
            const nuevoUsuario: User = {
                id: this.numeroUsuarios + 1,
                name: v.name,
                email: v.email,
                password: v.password,
                surname: v.surname,
                token: token,
                role: v.role,
                // courseId: 0
            }

            // console.log('nuevoUsuario');
            // console.log(nuevoUsuario);

            this.usuariosService.createUsuario(nuevoUsuario);
          }
        }
      });
    }

    onEditUser(userToEdit: User): void{
      // console.log(userToEdit)

      const dialogRef = this.madDialog.open(UsuariosFormDialogComponent,  {
        data : {
          userToEdit: userToEdit,
          operation: 'Editar'
        }
      });

      dialogRef.afterClosed().subscribe({
        next: (dataUpdate) => {

          if(dataUpdate){
            this.usuariosService.updateUsuario({'id': userToEdit.id ,...dataUpdate});
          }
        }
      })
    }


    onDeleteUser(userToDelete: User): void {
      const dialogRef = this.madDialog.open(ConfirmDialogComponent, {
        width: '370px',
        data: { mensaje: `¿Estás seguro que quieres eliminar a este usuario (${userToDelete.name?.toUpperCase()}) de la lista?`,
              titulo: 'Confirmación de eliminación'}
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.usuariosService.deleteUsuarioById(userToDelete.id);
        }
      });
    }

    ngOnDestroy(): void {
      this.destroyed.next(true);
    }
}
