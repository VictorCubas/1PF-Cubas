/* 
USER TABLE PUDO HABERSE LLAMADO STUDENT TABLE PERO UN NOMBRE MAS GENERICO
SERIA LO MAS CONVIENENTE, YA QUE ASI  SE PODRA UTILIZAR ESTA TABLA EN DEMAS COMPONENTES
*/

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models';
import { Teacher } from '../../../teacher/model';
import { Course } from '../../../courses/model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'actions'];

  @Input()
  dataSource: Student[] | Teacher[] | Course[] = [];

  // practicar un poco mas esta parte
  @Output()
  deleteUser = new EventEmitter<Student>();

  @Output()
  editUser = new EventEmitter<Student>();
}
