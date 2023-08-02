import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, map, tap } from 'rxjs';
import { UserFormDialogComponent } from '../../alumnos/components/user-form-dialog/user-form-dialog.component';
import { Teacher } from '../model';
import { TeacherService } from '../teacher.service';
import { ConfirmDialogComponent } from '../../alumnos/components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent {
  public destroyed = new Subject<boolean>();
  teachersAsync: Observable<Teacher[]>;
  numeroTeachers: number = 0;

  constructor(
    private madDialog: MatDialog,
    private teachersService: TeacherService){
        this.teachersAsync = this.teachersService.getTeachers().pipe(
          map(teachers => teachers.map(profesor => ({
            ...profesor, // Mantenemos todas las propiedades del profesor original
            name: profesor.name.toUpperCase() // Modificamos solo la propiedad "name"
          }))),
          tap(teachers => {
            this.numeroTeachers = teachers.length;
          })
        );
  }

  onCreateUser(): void{
    const  dialogRef = this.madDialog.open(UserFormDialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if(v){
          const nuevoTeacher: Teacher = {
              id: this.numeroTeachers + 1,
              name: v.name,
              email: v.email,
              password: v.password,
              surname: v.surname
          }

          this.teachersService.createTeacher(nuevoTeacher);
        }
      }
    });
  }

  onDeleteUser(userToDelete: Teacher): void {
    const dialogRef = this.madDialog.open(ConfirmDialogComponent, {
      width: '370px',
      data: { mensaje: `¿Estás seguro que quieres eliminar a este profesor (${userToDelete.name?.toUpperCase()}) de la lista?`,
            titulo: 'Confirmación de eliminación'}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teachersService.deleteTeacherById(userToDelete.id);
      }
    });
  }


  onEditUser(userToEdit: Teacher): void{
    console.log(userToEdit)

    const dialogRef = this.madDialog.open(UserFormDialogComponent,  {
      data : {
        userToEdit: userToEdit,
        operation: 'Editar'
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (dataUpdate) => {

        if(dataUpdate){
          this.teachersService.updateTeacher({'id': userToEdit.id ,...dataUpdate});
        }
      }
    })
  }
}
