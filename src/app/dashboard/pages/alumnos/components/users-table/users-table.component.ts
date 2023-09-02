/* 
USER TABLE PUDO HABERSE LLAMADO STUDENT TABLE PERO UN NOMBRE MAS GENERICO
SERIA LO MAS CONVIENENTE, YA QUE ASI  SE PODRA UTILIZAR ESTA TABLA EN DEMAS COMPONENTES
*/

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models';
import { Teacher } from '../../../teacher/model';
import { Course } from '../../../courses/model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAdmin } from 'src/app/store/auth.actions.ts/auth.selectos';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'actions'];
  public isAdmin$: Observable<boolean>;

  @Input()
  dataSource: Student[] | Teacher[] = [];

  // practicar un poco mas esta parte
  @Output()
  deleteUser = new EventEmitter<Student>();

  @Output()
  editUser = new EventEmitter<Student>();
  
  constructor(private store: Store){
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }
}
