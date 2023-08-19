import { Injectable } from "@angular/core";
import { LoginPayLoad } from "./models";
import { BehaviorSubject, Observable, map } from "rxjs";
import { User } from "../dashboard/pages/users/models";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Student } from "../dashboard/pages/alumnos/models";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'

@Injectable({providedIn: 'root'})
export class AuthService{
    private _authUser$ = new BehaviorSubject<User | null>(null);
    public authUser$ = this._authUser$.asObservable();
    private isAuthenticated: boolean = false;


    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private snackBar: MatSnackBar){
    }

    login(payLoad: LoginPayLoad): void{
        this.httpClient.get<Student []>('http://localhost:3000/students', {
            params: {
                email: payLoad.email || '',
                password: payLoad.password || ''
            }
        }).subscribe({
            next: (response) =>{
                if(response.length){
                    const authUser = response[0];
                    this._authUser$.next(authUser);
                    this.router.navigate(['dashboard'], {})

                    localStorage.setItem('token', authUser.token);
                    this.isAuthenticated = true;
                }
                else{
                    this._authUser$.next(null);
                    this.showSnackbar('Credenciales incorrectas', 'error-snackbar');
                }
            },
            error: (err) => {
                this.showSnackbar('No se ha podido iniciar sesion. Olvidaste Ejecutar Json Server?', 'error-snackbar');
            }
        })
    }

    isUserAuthenticated(): Observable<boolean>{
        // console.log('this.isAuthenticated: ' + this.isAuthenticated)
        // return this.isAuthenticated;
        return this.httpClient.get<Student[]>('http://localhost:3000/students', {
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
}