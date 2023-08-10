import { Injectable } from "@angular/core";
import { LoginPayLoad } from "./models";
import { BehaviorSubject } from "rxjs";
import { User } from "../dashboard/pages/users/models";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService{
    private _authUser$ = new BehaviorSubject<User | null>(null);
    public authUser$ = this._authUser$.asObservable();
    private isAuthenticated: boolean = false;


    constructor(private router: Router){

    }

    login(payLoad: LoginPayLoad): void{
        const MOCK_USER: User = {
            id:50,
            name: 'Mockname',
            surname: 'Mocksurname',
            email: 'fake_email@gmail.com',
            password: '12345'
        }

        if(payLoad.email === MOCK_USER.email && payLoad.password === MOCK_USER.password){
            this._authUser$.next(MOCK_USER);
            this.router.navigate(['dashboard'], {})
            this.isAuthenticated = true;
        }
        else{
            this._authUser$.next(null);
        }
    }

    isUserAuthenticated(): boolean{
        console.log('this.isAuthenticated: ' + this.isAuthenticated)
        return this.isAuthenticated;
    }
}