import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit{
  displayedColumns = ['id', 'name', 'course', 'total'];

  constructor(private store: Store){

  }

  ngOnInit(): void {
      
  }
}
