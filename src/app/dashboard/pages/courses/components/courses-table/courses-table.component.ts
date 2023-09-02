import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Teacher } from '../../../teacher/model';
import { Course } from '../../../courses/model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAdmin } from 'src/app/store/auth.actions.ts/auth.selectos';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  public isAdmin$: Observable<boolean>;

  @Input()
  dataSource: Course[] = [];

  // practicar un poco mas esta parte
  @Output()
  deleteUser = new EventEmitter<Course>();

  @Output()
  editUser = new EventEmitter<Course>();
  
  constructor(private store: Store){
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }
}
