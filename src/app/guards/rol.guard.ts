import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

export const rolGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  route.data['rol'];

  return auth.userState$.pipe(map((user) => {
    console.log(user?.email);
    console.log(auth.datosUsuario);
    
    if (!user?.email || !auth.datosUsuario) {
      return router.createUrlTree(['auth/login']);
    }

    if (auth.datosUsuario.rol !== route.data['rol']) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario no autorizado'
      });
      return router.createUrlTree(['home']);
    }
    
    return true;
  }));
};
