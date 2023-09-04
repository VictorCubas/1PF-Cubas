import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../users/models';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth.actions.ts/auth.selectos';

@Component({
  selector: 'app-usuarios-table',
  templateUrl: './usuarios-table.component.html',
  styleUrls: ['./usuarios-table.component.scss']
})
export class UsuariosTableComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'actions'];
  public isAdmin$: Observable<boolean>;

  @Input()
  dataSource: User[] = [];

  // practicar un poco mas esta parte
  @Output()
  deleteUser = new EventEmitter<User>();

  @Output()
  editUser = new EventEmitter<User>();
  
  constructor(private store: Store){
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }
}
