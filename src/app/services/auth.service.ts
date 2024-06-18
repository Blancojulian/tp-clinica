import { Injectable } from '@angular/core';
import { User, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState, updateProfile, fetchSignInMethodsForEmail, sendEmailVerification } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subject, map, tap } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { IUsuario } from '../interfaces/iusuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly userState$;//: Observable<User | null>;
  public readonly datosUsuario$;
  private subjectDatosUsuario;
  private _datosUsuario: IUsuario | null = null; 
  public get datosUsuario() : IUsuario | null {
    return this._datosUsuario;
  }
  public get nombreUsuario() : string | null {
    return this._datosUsuario ? this._datosUsuario.apellido + ' ' + this._datosUsuario.nombre : null;
  }
  
  public get currentUser() {
    return this.auth.currentUser;
  }
  

  constructor(
    private readonly auth: Auth,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.userState$ = authState(this.auth).pipe(tap(async(usuario)=>{
      if (!usuario?.email) {
        this._datosUsuario = null;
        this.subjectDatosUsuario.next(null);
        return;
      }
      this._datosUsuario = await this.usuarioService.getUsuarioPorEmail(usuario.email);
      this.subjectDatosUsuario.next(this._datosUsuario);

    }));
    this.subjectDatosUsuario  = new Subject<IUsuario | null>();
    this.datosUsuario$ = this.subjectDatosUsuario.asObservable();
    this.datosUsuario$.subscribe(u=>{
      console.log('datos');
      console.log(u);
    });
  }

  public async register(email: string, password: string, displayName: string | null = null, photoURL: string | null = null) {
    const credentials = await createUserWithEmailAndPassword(this.auth, email, password);
    //await updateProfile(credentials.user, {displayName, photoURL});
    await sendEmailVerification(credentials.user);
    return credentials;
  }

  public async enviarVerificacion() {
    if (this.auth.currentUser) {
      await sendEmailVerification(this.auth.currentUser);      
    }
  }
  public async login(email: string, password: string) {
    const credentials = await signInWithEmailAndPassword(this.auth, email, password);
    return credentials;
  }

  public async logout() {
    //this.auth.signOut()
    
    //fetchSignInMethodsForEmail(this.auth, 'email')
    console.log(this.router.routerState);
    this.router.navigate([]);
    await signOut(this.auth);
    if (this.router.url.includes('usuarios') || this.router.url.includes('turno')) {
      await this.router.navigateByUrl('/home');
    }
  }
}
