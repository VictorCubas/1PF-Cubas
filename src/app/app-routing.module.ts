import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { AlumnosComponent } from './dashboard/pages/alumnos/alumnos.component';
import { AlumnoDetailComponent } from './dashboard/pages/alumnos/pages/alumno-detail/alumno-detail.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { TeacherComponent } from './dashboard/pages/teacher/teacher/teacher.component';
import { CoursesComponent } from './dashboard/pages/courses/courses.component';

//objetos de configuracion de rutas
const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    // children: [
    //   {
    //     path: 'home',
    //     component: HomeComponent
    //   },
    //   {
    //     path: 'students',
    //     children: [
    //       {
    //         path: '',
    //         component: AlumnosComponent
    //       },
    //       {
    //         path: ':id',
    //         component: AlumnoDetailComponent
    //       }
    //     ]
    //   },
    //   {
    //     path: 'courses',
    //     children: [
    //       {
    //         path: '',
    //         component: CoursesComponent
    //       },
    //       // {
    //       //   path: ':id',
    //       //   component: AlumnoDetailComponent
    //       // }
    //     ]
    //   },
    //   {
    //     path: 'teachers',
    //     children: [
    //       {
    //         path: '',
    //         component: TeacherComponent
    //       },
    //       // {
    //       //   path: ':id',
    //       //   component: AlumnoDetailComponent
    //       // }
    //     ]
    //   },
    //   {
    //     path: '**',
    //     component: HomeComponent
    //   }
    // ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    // children: [
    //   {
    //     path: 'login',
    //     component: LoginComponent
    //   },
    //   {
    //     path: 'register',
    //     component: RegisterComponent
    //   },
    //   {
    //     path: '**',
    //     component: LoginComponent
    //   }
    // ]
  },
  {
    path: '**',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
