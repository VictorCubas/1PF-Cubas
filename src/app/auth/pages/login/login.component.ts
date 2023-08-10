import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public emailControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordControl = new FormControl('', [Validators.required]);

  public loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(private router: Router) {}

  login(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      //formulario valido
      this.router.navigate(['dashboard'], {})
    }
  }
}
