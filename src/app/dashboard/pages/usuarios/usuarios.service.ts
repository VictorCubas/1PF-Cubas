import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, forkJoin, map, mergeMap, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../users/models';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios$ = new BehaviorSubject<User []>([]);

  constructor(private httpClient: HttpClient) { 
    this.loadUsuarios();
  }

  loadUsuarios(): void{

    this.httpClient.get<User []>(environment.baseApiUrl + '/users', {
      headers: new HttpHeaders({
        'token': '123456789'
      })
    }).subscribe({
      next: (response) => {
        this.usuarios$.next(response);
      }
    });
  }

  getUsuarios(): Subject<User[]>{
    return this.usuarios$;
  }

  createUsuario(usuario: User): void{
    
    this.httpClient.post<User>(environment.baseApiUrl + '/users', {...usuario})
    .pipe(
      mergeMap((userCreate) => this.usuarios$.pipe(
        take(1),
        map(
          (arrayActual) => [...arrayActual, userCreate])
        )
      )
    ).subscribe({
      next: (nuevoArray) => {
        this.usuarios$.next(nuevoArray);
      }
    });

  }

  updateUsuario(usuario: User): void{
    this.httpClient.put(environment.baseApiUrl + '/users/' + usuario.id, usuario)
    .subscribe({
      next: () => this.loadUsuarios()
    })
  }

  deleteUsuarioById(id: number): void{
    // console.log('ELIMINANDO.....');
    this.httpClient.delete(environment.baseApiUrl + '/users/' + id)
    .pipe(
      mergeMap((usuarioEliminado) => this.usuarios$.pipe(
        take(1),
        map((arrayActual) => arrayActual.filter((u) => u.id !== id)
      )))
    ).subscribe({
      next: (arrayActualizado) => this.usuarios$.next(arrayActualizado)
    })
  }

  getAlumnoById(id: number): Observable<User | null> {
    return this.usuarios$.pipe(
      map(usuarios => usuarios.find(usuario => usuario.id === id) || null),
      take(1)
    );
  }
}
