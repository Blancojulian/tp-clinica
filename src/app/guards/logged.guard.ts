import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';
import { map, take } from 'rxjs';

export const loggedGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  return auth.userState$.pipe(
    take(1),
    map((user) => {
      if (!!user) {
        Swal.fire({
          icon: 'error',
          title: 'Mensaje',
          text: 'Usuario ya se encuentra logueado',
          heightAuto: false
        });
        return router.createUrlTree(['home']);
      }
      return true;
    })
    
  )
};
