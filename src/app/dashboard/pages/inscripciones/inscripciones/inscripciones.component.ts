import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from '../store/inscripciones.actions';
import { Observable } from 'rxjs';
import { Inscripcion, InscripcionWithStudentAndCourse } from '../models';
import { selectInscripciones } from '../store/inscripciones.selectors';
import { MatDialog } from '@angular/material/dialog';
import { InscripcionesDialogComponent } from '../components/inscripciones-dialog/inscripciones-dialog.component';
import { ConfirmDialogComponent } from '../../alumnos/components/confirm-dialog/confirm-dialog.component';
import { Student } from '../../alumnos/models';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit{
  displayedColumns = ['id', 'name', 'course', 'actions'];
  inscripciones$: Observable<InscripcionWithStudentAndCourse []>;

  constructor(private store: Store,
    private matDiaglo: MatDialog,
    private matDialog: MatDialog){
    this.inscripciones$ = this.store.select(selectInscripciones);
  }

  ngOnInit(): void {
      this.store.dispatch(InscripcionesActions.loadInscripcioness())
  }

  onAdd(): void{
    this.matDiaglo.open(InscripcionesDialogComponent);
  }

  onDeleteInscripcion(inscripcionToDelete: Inscripcion): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '370px',
      data: { mensaje: `¿Estás seguro que quieres eliminar a esta inscripcion con id (${inscripcionToDelete.id}) de la lista?`,
            titulo: 'Confirmación de eliminación'}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        console.log(inscripcionToDelete)
        this.store.dispatch(InscripcionesActions.deleteInscripcion({id: inscripcionToDelete.id}));

        setTimeout(() => {
          this.store.dispatch(InscripcionesActions.loadInscripcioness());
        }, 300);
      }
    });
  }
}
