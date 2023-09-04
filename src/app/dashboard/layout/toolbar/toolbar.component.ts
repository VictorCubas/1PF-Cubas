import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.services';
import { User } from '../../pages/users/models';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth.actions.ts/auth.selectos';
import { ToolbarTitleService } from './toolbar-title.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit{
  title: string = '';
  @Input()
  public drawer?: MatDrawer;
  public authUser$: Observable<User | null>;
  
  constructor(
      private store: Store,
      private toolbarTitleService: ToolbarTitleService){
   this.authUser$ = this.store.select(selectAuthUser);
  }

  ngOnInit() {
    this.toolbarTitleService.title$.subscribe(title => {
      this.title = title;
    });
  }
}