import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { AlumnoDetailComponent } from "./pages/alumnos/pages/alumno-detail/alumno-detail.component";
import { AlumnosComponent } from "./pages/alumnos/alumnos.component";
import { CoursesComponent } from "./pages/courses/courses.component";
import { TeacherComponent } from "./pages/teacher/teacher/teacher.component";

const routes: Routes = [
{
    path: 'home',
    component: HomeComponent
    },
    {
      path: 'students',
      loadChildren: () => import('./pages/alumnos/alumnos.module').then(m => m.AlmunosModule)
    },
    {
      path: 'courses',
      loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule)
    // children: [
    //     {
    //     path: '',
    //     component: CoursesComponent
    //     }
    // ]
    },
    {
    path: 'teachers',
    loadChildren: () => import('./pages/teacher/teacher/teacher.module').then(m => m.TeacherModule)
    // children: [
    //     {
    //     path: '',
    //     component: TeacherComponent
    //     },
    // ]
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
