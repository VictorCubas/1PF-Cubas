import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { adminGuard } from "../core/guards/admin.guard";
import { InscripcionesModule } from "./pages/inscripciones/inscripciones.module";

const routes: Routes = [
{
    path: 'home',
    component: HomeComponent,
    },
    {
      path: 'students',
      canActivate: [adminGuard],
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
      path: 'inscripciones',
      loadChildren: () => import('./pages/inscripciones/inscripciones.module').then(m => m.InscripcionesModule)
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
