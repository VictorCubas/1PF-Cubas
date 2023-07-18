import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { Student } from './models';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


const ELEMENT_DATA: Student[] = [
  {
    id: 1,
    name: 'Marcos',
    surname: 'Rodriguez',
    email: "marcos@gmail.com",
    password: "123456"
  },
  {
    id: 2,
    name: 'Julian',
    surname: 'Perez',
    email: "julian@gmail.com",
    password: "123456"
  },
  {
    id: 3,
    name: 'Maria',
    surname: 'Lopez',
    email: "maria@gmail.com",
    password: "123456"
  },
  {
    id: 4,
    name: 'Andrea',
    surname: 'Escurra',
    email: "andrea@gmail.com",
    password: "123456"
  },
  {
    id: 5,
    name: 'Victor',
    surname: 'Cubas',
    email: "victor@gmail.com",
    password: "123456"
  },
];

@Component({
  selector: 'app-students',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent {
  public students: Student[] = ELEMENT_DATA;
  
    constructor(
      private madDialog: MatDialog,
    ){
      
    }

    onCreateUser(): void{
      const  dialogRef = this.madDialog.open(UserFormDialogComponent);

      dialogRef.afterClosed().subscribe({
        next: (v) => {
          if(v){

            this.students = [...this.students,
              {
                id: this.students.length + 1,
                name: v.name,
                email: v.email,
                password: v.password,
                surname: v.surname
              }]
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
          this.students = this.students.map((user) => {
            return user.id === userToEdit.id 
                  ? {...user, ...dataUpdate}
                  : user 
          })
        }
      })
    }

    onDeleteUser(userToDelete: Student): void{

      if(confirm(`Estas seguro de eliminar a ${userToDelete.name}?`)){
        this.students = this.students.filter((u) => u.id !== userToDelete.id)
      }
    }

    onDelete2(userToEdit: Student): void{

      const  dialogRef = this.madDialog.open(UserFormDialogComponent,  {
        data : {
          userToEdit: userToEdit,
          operation: 'Editar'
        }
      });

      dialogRef.afterClosed().subscribe({
        next: (dataUpdate) => {
          this.students = this.students.map((user) => {
            return user.id === userToEdit.id 
                  ? {...user, ...dataUpdate}
                  : user 
          })
        }
      })
    }

    openConfirmDialog(userToDelete: Student): void {
      const dialogRef = this.madDialog.open(ConfirmDialogComponent, {
        width: '370px',
        data: { mensaje: `¿Estás seguro que quieres eliminar a este alumno (${userToDelete.name?.toUpperCase()}) de la lista?`,
              titulo: 'Confirmación de eliminación'}
      });
      
      dialogRef.afterClosed().subscribe(result => {
        // console.log(result);
        if (result) {
          this.students = this.students.filter((u) => u.id !== userToDelete.id)
        }
      });
    }
}
