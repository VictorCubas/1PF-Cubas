import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
{
    path: 'home',
    component: HomeComponent,
    },
    {
      path: 'students',
      loadChildren: () => import('./pages/alumnos/alumnos.module').then(m => m.AlmunosModule)
    },
    {
      path: 'courses',
      loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule)
    },
    {
    path: 'teachers',
    loadChildren: () => import('./pages/teacher/teacher/teacher.module').then(m => m.TeacherModule)
    },
    {
    path: '**',
    component: HomeComponent
    }
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }
