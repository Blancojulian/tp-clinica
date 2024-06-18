import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take, tap } from 'rxjs';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  return auth.userState$.pipe(
    take(1),
//    tap((user) => !!user ? true : router.createUrlTree(['login'])),
    map((user) => {
      
      if (!user) {
        return router.createUrlTree(['/auth/login']);
      }
      if (!user.emailVerified) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debe verificar email'
        });
        //auth.logout();
        return router.createUrlTree(['home']);
      }
      return true;
    }) 
  );
};
