import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LogService } from '../../services/log.service';
import { FirebaseError } from '@angular/fire/app';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OpcionUsuarioComponent } from '../opcion-usuario/opcion-usuario.component';
import { Roles } from '../../interfaces/iusuario';
//import { CaptchaComponent } from '../captcha/captcha.component';
import { Usuario } from '../../models/usuario';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EspecialidadService } from '../../services/especialidad.service';
import {
  MatDialog
} from '@angular/material/dialog';
import { DialogEspecialidadComponent } from '../dialog-especialidad/dialog-especialidad.component';
import { StorageService } from '../../services/storage.service';
import { InputFileComponent } from '../input-file/input-file.component';
import { UsuarioService } from '../../services/usuario.service';
import {MatInputModule} from '@angular/material/input';
import { FormularioModule } from '../forms/formulario.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgClass, MatFormFieldModule, MatSelectModule, 
    MatButtonModule, MatCardModule, MatProgressSpinnerModule, OpcionUsuarioComponent, FormularioModule,//CaptchaComponent,
    InputFileComponent, MatInputModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
//private reEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //regex para que tenga por lo menos una letra y un numero
  //private rePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  form: FormGroup = new FormGroup({
    nombre: new FormControl(),
    apellido: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    rol: new FormControl(),
    captcha: new FormControl(),
    imagenUno: new FormControl(),
    imagenDos: new FormControl(),
    //obraSocial: new FormControl(),
    especialidad: new FormControl(),
  })
  isLoading = false;
  rol!: Roles;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private usuarioService: UsuarioService,
    private logService: LogService,
    private storage: StorageService,
    public especialidadService: EspecialidadService,
    private dialog: MatDialog
  ) {}

  public get controls() {
    return this.form.controls
  }
  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre:['', [Validators.required, Validators.pattern(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/)]],
      apellido:['', [Validators.required, Validators.pattern(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/)]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
      rol:['', [Validators.required, Validators.pattern(/^(especialista)$|^(paciente)$/)]],
      captcha:[false, [Validators.required, Validators.requiredTrue]],
      imagenUno:[null, [Validators.required, this.archivoValidator]],
      imagenDos:[null, [Validators.required, this.archivoValidator]],
      obraSocial:['', [Validators.required, Validators.pattern(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/)] ],
      especialidad:['', [this.pruebaValidator, Validators.required, Validators.pattern(/^[A-Za-zÑñÁáÉéÍíÓóÚú]+$/)] ],
      
    }, {
      validators: []
    })
  }


  private pruebaValidator(control: AbstractControl) {
    console.log(control.value);
    
    return null
  }

  async onSubmit() {

    console.log('form valid '+this.form.valid);
    
    
    if (this.form.valid && false) {
      this.isLoading = true;
      let urlImagenUno: string;
      try {

        if (this.form.controls['rol'].value !== 'paciente' && this.form.controls['rol'].value !== 'especialista') {
          throw new Error('Rol invalido');
        }

        urlImagenUno = await this.storage.guardarArchivo(this.form.controls['imagenUno'].value);
        
        const usuario = new Usuario(
          this.form.controls['nombre'].value.toLowerCase(),
          this.form.controls['apellido'].value.toLowerCase(),
          this.form.controls['fechaNacimiento'].value,
          this.form.controls['dni'].value,
          this.form.controls['email'].value.toLowerCase(),
          this.form.controls['password'].value,
          this.form.controls['rol'].value,
          urlImagenUno,
        );

        if (this.form.controls['rol'].value === 'paciente') {
          usuario.urlImagenDos = await this.storage.guardarArchivo(this.form.controls['imagenUno'].value);
          usuario.obraSocial = '';
        }

        //usuario.urlImagenUno = await this.storage.guardarArchivo()


        const credentials = await this.authService.register(
          this.form.controls['email'].value,
          this.form.controls['password'].value,
          this.form.controls['nombre'].value.toLowerCase()+' '+this.form.controls['apellido'].value.toLowerCase()
        );
        //await this.logService.crearLog({email: credentials.user.email || 'Sin email', userId: credentials.user.uid  });
        await this.usuarioService.crearUsuario(usuario);
        await Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Se ha Registrado con exito'
        });
        await this.router.navigateByUrl('/home');
      } catch (err) {
        //console.log(err);
        
        const msg = err instanceof FirebaseError ? 'Email ya se encuenta en uso' : 'Ocurrio un error';
        //(err as Error)?.message || 'Ocurrio un error'
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: msg
        });
      } finally {
        this.isLoading = false;
      }
      
    }
  }

  async openDialog(): Promise<void> {
    const dialogRef = this.dialog.open(DialogEspecialidadComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe(async(result) => {
      console.log('The dialog was closed '+result);
      //this.animal = result;
      if (result && typeof result === 'string') {
        await this.especialidadService.crearEspecialidad({especialidad: result});
      }
    });
  }

  recibirDato(rolSeleccionado: Roles) {
    this.rol = rolSeleccionado;
  }

  private archivoValidator(control: AbstractControl) {
    if (!control.value) {
      const err: ValidationErrors = {
        'requerido': 'No adjunto imagen'
      } 
      return err;
    }
    const archivo = control.value;
    const ext = archivo.name.slice(archivo.name.lastIndexOf('.'));
    if (ext !== '.jpg' && ext !== '.jpeg') {
      const err: ValidationErrors = {
        'requerido': 'Formato invalido, sole se permite jpg'
      } 
      return err;
    }
    return null;
  }


  private match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}
