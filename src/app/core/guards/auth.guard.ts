import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.services';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

    return authService.isUserAuthenticated()
    ? true // Permitir acceso a la ruta
    : router.createUrlTree(['/auth/login']);
};
