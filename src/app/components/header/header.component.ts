import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule, NgClass } from '@angular/common';
import { Subscription, take, tap } from 'rxjs';
import { User, UserInfo } from '@angular/fire/auth';
import { IUsuario } from '../../interfaces/iusuario';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLogged: boolean = false;
  userInfo: UserInfo | null = null;
  datosUsuario: IUsuario | null = null;
  rutaTurnos = 'home';
  sus: Subscription;
  subDatos!: Subscription;

  constructor(public authService: AuthService, private router: Router) {
    this.sus = this.authService.userState$.subscribe((user)=> {
      this.isLogged = !!user;
      this.userInfo = user;
    });
    this.subDatos = this.authService.datosUsuario$.subscribe((user)=> {
      this.datosUsuario = user;
      if (user?.rol === 'admin') {
        this.rutaTurnos = 'turno/admin';
      } else if (user?.rol === 'paciente') {
        this.rutaTurnos = 'turno/paciente';
      } else if (user?.rol === 'especialista') {
        this.rutaTurnos = 'turno/especialista';
      }
    });
  }

  ngOnInit(): void {
    //this.isLogged = this.authService.isLoggedIn();
    //this.isLogged = this.authService.userState$.pipe(take(1), tap((user)=> !!user));
    
  }
  ngOnDestroy(): void {
    this.sus.unsubscribe();
    this.subDatos.unsubscribe();
  }

  async logout() {

    if (this.isLogged) {
      await this.authService.logout();
      const res = await this.router.navigate([]);
      //console.log('router res: '+res);
      //console.log('router route: '+this.router.url);
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Mensaje',
        text: 'Usuario no esta logueado',
        heightAuto: false
      });
    }

  }
}
