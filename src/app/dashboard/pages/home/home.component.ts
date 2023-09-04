import { Component } from '@angular/core';
import { ToolbarTitleService } from '../../layout/toolbar/toolbar-title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private toolbarTitleService: ToolbarTitleService){
    this.toolbarTitleService.setTitle('');
  } 
}
