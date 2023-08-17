import { Injectable } from "@angular/core";
import { LoginPayLoad } from "./models";
import { BehaviorSubject } from "rxjs";
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
                     this._authUser$.next(response[0]);
                     this.router.navigate(['dashboard'], {})
                     this.isAuthenticated = true;
                }
                else{
                    this._authUser$.next(null);
                    this.showSnackbar('Credenciales incorrectas', 'error-snackbar');
                }
            },
            error: (err) => {
                this.showSnackbar('No se ha podido iniciar sesion', 'error-snackbar');
            }
        })
    }

    isUserAuthenticated(): boolean{
        // console.log('this.isAuthenticated: ' + this.isAuthenticated)
        return this.isAuthenticated;
    }

    showSnackbar(mensaje: string, customClass: string) {
        const config = new MatSnackBarConfig();
        config.panelClass = [customClass]; // Agrega la clase personalizada al panel
        config.duration = 3500;
    
        this.snackBar.open(mensaje, 'Cerrar', config);
    }
}