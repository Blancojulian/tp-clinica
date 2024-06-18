import { Routes } from '@angular/router';
import { loggedGuard } from './guards/logged.guard';
import { rolGuard } from './guards/rol.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m=> m.HomeComponent)
    },
    {
        path: 'login',
        canActivate: [loggedGuard],
        loadComponent: () => import('./components/login/login.component').then(m=> m.LoginComponent),
    },
    {
        path: 'seleccion-registro',
        canActivate: [loggedGuard],
        loadComponent: () => import('./components/seleccion-registro/seleccion-registro.component').then(m=> m.SeleccionRegistroComponent),
        
    },
    {
        path: 'auth',
        canActivate: [loggedGuard],
        loadChildren: () => import('./components/forms/formulario.module').then(m=> m.FormularioModule),
        
    },
    
    {
        path: 'turno',
        canActivate: [authGuard],
        loadChildren: () => import('./components/turno/turno.module').then(m => m.TurnoModule),
    },
    {
        path: 'prueba',
        loadComponent: () => import('./components/prueba/prueba.component').then(m=> m.PruebaComponent),
        
    },
    {
        path: 'usuarios',
        data: {
            rol: 'admin'
        },
        canActivate: [rolGuard],
        loadChildren: () => import('./components/usuarios/usuarios.module').then(m=> m.UsuariosModule),
        
    },
    {
        path: '**',
        loadComponent: () => import('./components/not-found/not-found.component').then(m=> m.NotFoundComponent)
    },

];
