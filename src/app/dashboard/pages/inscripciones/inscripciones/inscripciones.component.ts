import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from '../store/inscripciones.actions';
import { Observable } from 'rxjs';
import { InscripcionWithStudentAndCourse } from '../models';
import { selectInscripciones } from '../store/inscripciones.selectors';
import { MatDialog } from '@angular/material/dialog';
import { InscripcionesDialogComponent } from '../components/inscripciones-dialog/inscripciones-dialog.component';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit{
  displayedColumns = ['id', 'name', 'course', 'actions'];
  inscripciones$: Observable<InscripcionWithStudentAndCourse []>;

  constructor(private store: Store,
    private matDiaglo: MatDialog){
    this.inscripciones$ = this.store.select(selectInscripciones);
  }

  ngOnInit(): void {
      this.store.dispatch(InscripcionesActions.loadInscripcioness())
  }

  onAdd(): void{
    this.matDiaglo.open(InscripcionesDialogComponent);
  }
}
