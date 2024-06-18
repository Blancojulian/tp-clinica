import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FirebaseError } from '@angular/fire/app';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { StorageService } from '../../../services/storage.service';



@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrl: './registro-paciente.component.css',
})
export class RegistroPacienteComponent {

  form: FormGroup = new FormGroup({
    nombre: new FormControl(),
    apellido: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    rol: new FormControl(),
    captcha: new FormControl(),
    imagenUno: new FormControl(),
    imagenDos: new FormControl(),
    obraSocial: new FormControl(),
    dni: new FormControl(),
    fechaNacimiento: new FormControl(),
  })
  isLoading = false;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private usuarioService: UsuarioService,
    private storage: StorageService,
  ) {}

  public get controls() {
    return this.form.controls;
  }
  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre:['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/)]],
      apellido:['', [Validators.required, Validators.pattern(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/)]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
      captcha:[false, [Validators.required, Validators.requiredTrue]],
      imagenUno:[null, [Validators.required, this.archivoValidator]],
      imagenDos:[null, [Validators.required, this.archivoValidator]],
      obraSocial:['', [Validators.required, Validators.pattern(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/)] ],
      dni:['', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)] ],
      fechaNacimiento:['', [this.rangoFechaValidator(), Validators.required] ],
      
    }, {
      validators: []
    })
  }

  public controlarCampo(campo: string) {
    this.form.controls['nombre'].errors;
    //(this.form.controls['nombre'])?.errors['maxlength']
    return this.controls[campo].errors && this.controls[campo].touched;
  }


  private pruebaValidator(control: AbstractControl) {
    console.log(control.value);
    
    return null
  }

  async onSubmit() {

    this.form.markAllAsTouched();
    
    if (this.form.valid) {
      this.isLoading = true;
      let urlImagenUno: string;
      let urlImagenDos: string;
      try {

        urlImagenUno = await this.storage.guardarArchivo(this.form.controls['imagenUno'].value);
        urlImagenDos = await this.storage.guardarArchivo(this.form.controls['imagenDos'].value);
        
        const credentials = await this.authService.register(
          this.form.controls['email'].value,
          this.form.controls['password'].value,
          this.form.controls['nombre'].value.toLowerCase()+' '+this.form.controls['apellido'].value.toLowerCase()
        );

        const usuario = new Usuario(
          this.form.controls['nombre'].value.toLowerCase(),
          this.form.controls['apellido'].value.toLowerCase(),
          this.form.controls['fechaNacimiento'].value.toDate(),
          this.form.controls['dni'].value,
          this.form.controls['email'].value.toLowerCase(),
          this.form.controls['password'].value,
          'paciente',
          urlImagenUno,
          urlImagenDos,
          credentials.user.uid
        );
        usuario.obraSocial = '';
        usuario.fechaAprobado = new Date();
        
        await this.usuarioService.crearUsuario(usuario);
        await Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Se ha Registrado con exito'
        });
        await this.router.navigateByUrl('/home');
      } catch (err) {
        console.log(err);
        
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

  private archivoValidator(control: AbstractControl) {
    if (!control.value) {
      const err: ValidationErrors = {
        'requerido': 'No adjunto imagen'
      } 
      return err;
    }
    const archivo = control.value;
    const ext = archivo.name.slice(archivo.name.lastIndexOf('.'));
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      const err: ValidationErrors = {
        'formato': 'Formato invalido, sole se permite jpg o png'
      } 
      return err;
    }
    return null;
  }

  private rangoFechaValidator(inicio?: Date, final?: Date) {
    return function (control: AbstractControl) {
      if (!control.value) {
        return null;
      };
      
      const fecha = control.value.toDate();
      const fechaHoy = new Date();
      if (!final) {
        final = new Date(fechaHoy.getFullYear() - 0, fechaHoy.getMonth(), fechaHoy.getDate());
      }
      if (!inicio) {
        inicio = new Date(fechaHoy.getFullYear() - 80, fechaHoy.getMonth(), fechaHoy.getDate());
      }

      if (fecha > final || fecha < inicio) {
        const err: ValidationErrors = {
          'rango': `Fecha fuera de rango entre ${inicio.toLocaleDateString('es-AR')} a ${final.toLocaleDateString('es-AR')}`
        } 
        return err;
      }

      return null
    }
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
