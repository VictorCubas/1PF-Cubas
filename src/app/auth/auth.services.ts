import { Injectable } from "@angular/core";
import { LoginPayLoad } from "./models";
import { BehaviorSubject } from "rxjs";
import { User } from "../dashboard/pages/users/models";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Student } from "../dashboard/pages/alumnos/models";

@Injectable({providedIn: 'root'})
export class AuthService{
    private _authUser$ = new BehaviorSubject<User | null>(null);
    public authUser$ = this._authUser$.asObservable();
    private isAuthenticated: boolean = false;


    constructor(private router: Router,
        private httpClient: HttpClient){

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
                }
            }
        })
    }

    isUserAuthenticated(): boolean{
        console.log('this.isAuthenticated: ' + this.isAuthenticated)
        return this.isAuthenticated;
    }
}