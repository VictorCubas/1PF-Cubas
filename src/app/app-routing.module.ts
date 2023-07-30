import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { AlumnosComponent } from './dashboard/pages/alumnos/alumnos.component';
import { AlumnoDetailComponent } from './dashboard/pages/alumnos/pages/alumno-detail/alumno-detail.component';

//objetos de configuracion de rutas
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'students',
        component: AlumnosComponent
      },
      {
        path: 'students/:id',
        component: AlumnoDetailComponent
      },
      {
        path: '**',
        component: HomeComponent
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent
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
