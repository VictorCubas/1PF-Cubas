import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { TeacherDetailComponent } from './pages/teacher-detail/teacher-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherComponent
  },
  {
    path: ':id',
    component: TeacherDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
