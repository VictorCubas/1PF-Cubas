import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { Student } from './models';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { Observable, Subject, map, tap } from 'rxjs';
import { AlumnosService } from './alumnos.service';


@Component({
  selector: 'app-students',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnDestroy{
  public students: Student[] = [];
  public destroyed = new Subject<boolean>();
  alumnosAsync: Observable<Student[]>;
  numeroAlumnos: number = 0;
  
    constructor(
      private madDialog: MatDialog,
      private alumnosService: AlumnosService){
          this.alumnosAsync = this.alumnosService.getAlumnos().pipe(
            map(alumnos => alumnos.map(alumno => ({
              ...alumno, // Mantenemos todas las propiedades del alumno original
              name: alumno.name.toUpperCase() // Modificamos solo la propiedad "name"
            }))),
            tap(alumnos => {
              this.numeroAlumnos = alumnos.length;
            })
          );
    }

    onCreateUser(): void{
      const  dialogRef = this.madDialog.open(UserFormDialogComponent);

      dialogRef.afterClosed().subscribe({
        next: (v) => {
          if(v){
            const nuevoAlumno: Student = {
                id: this.numeroAlumnos + 1,
                name: v.name,
                email: v.email,
                password: v.password,
                surname: v.surname
            }

            this.alumnosService.createAlumno(nuevoAlumno);
          }
        }
      });
    }

    onEditUser(userToEdit: Student): void{
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
            this.alumnosService.updateAlumno({'id': userToEdit.id ,...dataUpdate});
          }
        }
      })
    }


    onDeleteUser(userToDelete: Student): void {
      const dialogRef = this.madDialog.open(ConfirmDialogComponent, {
        width: '370px',
        data: { mensaje: `¿Estás seguro que quieres eliminar a este alumno (${userToDelete.name?.toUpperCase()}) de la lista?`,
              titulo: 'Confirmación de eliminación'}
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.alumnosService.deleteAlumnoById(userToDelete.id);
        }
      });
    }

    ngOnDestroy(): void {
      this.destroyed.next(true);
    }
}
