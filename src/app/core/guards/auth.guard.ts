import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.services';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
    return authService.isUserAuthenticated().pipe(
      map((estaAutenticado: boolean) => {
        if (estaAutenticado) {
          return true; // Permitir acceso a la ruta
        } else {
          // Redirigir a la ruta de login
          return router.createUrlTree(['/auth/login']);
        }
      })
    );
};