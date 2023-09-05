import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { AuthService } from "./auth.services"
import { Router } from "@angular/router"
import { Student } from "../dashboard/pages/alumnos/models"
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MockProvider} from 'ng-mocks'
// import { RouterMock } from "../core/mocks/router.mock"
// import { MockProvider } from 'ng-mocks';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule],
      providers: [
        MockProvider(Router)
      ]
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpController.verify();
  })

  it('Si el login es valido el observable authUser$ debe emitir un valor', (done) => {
    const mockUser: Student = {
      id: 5,
      email: 'victor@gmail.com',
      password: '123456',
      name: 'Victor',
      surname: 'Cubas',
      token: '2132342fsdfsdfadasdqwe',
      role: ''
    }

    const mockResponse: Student[] = [mockUser];

    // 1 - Llamando al login
    service.login({
      email: mockUser.email,
      password: mockUser.password
    });

    // 2 - Mockeamos la request
    httpController.expectOne({
      method: 'GET',
      url: `http://localhost:3000/students?email=${mockUser.email}&password=${mockUser.password}`
    }).flush(mockResponse)

    // 3 - Vemos si recibimos el usuario autenticado despues del login
    service.authUser$.subscribe({
      next: (authUser: any) => {
        expect(authUser).toBeTruthy();
        expect(authUser).toEqual(mockUser);
        done();
      }
    })
  })
})

