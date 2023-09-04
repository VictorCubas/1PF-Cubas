import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectIsAdmin } from 'src/app/store/auth.actions.ts/auth.selectos';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const isAdmin = inject(Store).select(selectIsAdmin).pipe(
    map((isAdmin) => {
      // console.log(adminGuard.name, "Redirigiendo al inicio");
      // console.log(isAdmin)
      return isAdmin  ? true: router.createUrlTree(['/dashboard/home']);
    })
  )
  
  return isAdmin;

};
