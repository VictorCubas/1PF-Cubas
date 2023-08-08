import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HomeModule } from './pages/home/home.module';
import { AlmunosModule } from './pages/alumnos/alumnos.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { TeacherModule } from './pages/teacher/teacher/teacher.module';
import { CoursesComponent } from './pages/courses/courses.component';
import { CoursesModule } from './pages/courses/courses.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    NavMenuComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    HomeModule,
    SharedModule,
    RouterModule,
    CoursesModule,
    DashboardRoutingModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
