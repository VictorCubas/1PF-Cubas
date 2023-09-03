import { Injectable } from "@angular/core";
import { LoginPayLoad } from "./models";
import { BehaviorSubject, Observable, map } from "rxjs";
import { User } from "../dashboard/pages/users/models";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Student } from "../dashboard/pages/alumnos/models";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'
import { environment } from "src/environments/environment";
import { Store } from "@ngrx/store";
import { AuthActions } from "../store/auth.actions.ts/auth.actions";

@Injectable({providedIn: 'root'})
export class AuthService{
    private isAuthenticated: boolean = false;


    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private snackBar: MatSnackBar,
        private store: Store){
    }

    login(payLoad: LoginPayLoad): void{
        this.httpClient.get<Student []>(environment.baseApiUrl + '/students', {
            params: {
                email: payLoad.email || '',
                password: payLoad.password || ''
            }
        }).subscribe({
            next: (response) =>{
                if(response.length){
                    const authUser = response[0];

                    this.store.dispatch(AuthActions.setAuthUser({payload: authUser}))

                    localStorage.setItem('token', authUser.token);
                    this.isAuthenticated = true;
                    console.log('si, estoy autenticado')

                    this.router.navigate(['dashboard'], {})
                }
                else{
                    this.showSnackbar('Credenciales incorrectas', 'error-snackbar');
                    this.store.dispatch(AuthActions.setAuthUser({payload: null}))
                }
            },
            error: (err) => {
                this.showSnackbar('No se ha podido iniciar sesion. Olvidaste Ejecutar Json Server?', 'error-snackbar');
            }
        })
    }

    isUserAuthenticated(): Observable<boolean>{
        return this.httpClient.get<Student[]>(environment.baseApiUrl + '/students', {
            params: {
                token: localStorage.getItem('token') || '',
            }
        }).pipe(
            map((students) => {
                return !!students.length
            })
        )
    }

    showSnackbar(mensaje: string, customClass: string) {
        const config = new MatSnackBarConfig();
        config.panelClass = [customClass];
        config.duration = 3500;
    
        this.snackBar.open(mensaje, 'Cerrar', config);
    }

    public logout(): void{
        this.store.dispatch(AuthActions.setAuthUser({payload: null}))
    }
}