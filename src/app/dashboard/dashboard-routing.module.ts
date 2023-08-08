import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { AlumnoDetailComponent } from "./pages/alumnos/pages/alumno-detail/alumno-detail.component";
import { AlumnosComponent } from "./pages/alumnos/alumnos.component";
import { DashboardComponent } from "./dashboard.component";
import { CoursesComponent } from "./pages/courses/courses.component";
import { TeacherComponent } from "./pages/teacher/teacher/teacher.component";

const routes: Routes = [
{
    path: 'home',
    component: HomeComponent
    },
    {
    path: 'students',
    children: [
        {
        path: '',
        component: AlumnosComponent
        },
        {
        path: ':id',
        component: AlumnoDetailComponent
        }
    ]
    },
    {
    path: 'courses',
    children: [
        {
        path: '',
        component: CoursesComponent
        },
        // {
        //   path: ':id',
        //   component: AlumnoDetailComponent
        // }
    ]
    },
    {
    path: 'teachers',
    children: [
        {
        path: '',
        component: TeacherComponent
        },
        // {
        //   path: ':id',
        //   component: AlumnoDetailComponent
        // }
    ]
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
