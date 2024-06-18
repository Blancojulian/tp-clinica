import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FirebaseError } from '@angular/fire/app';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  //private reEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //regex para que tenga por lo menos una letra y un numero
  //private rePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  form: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })
  submitted = false;
  isLoading = false;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  public get controls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]]

    }, {
      validators: []
    })
  }
  async onSubmit() {
    
    this.submitted = true;

    //if (this.form.valid) {
      this.isLoading = true;
      try {
        const userCrentialds = await this.authService.login(
          this.form.controls['email'].value,
          this.form.controls['password'].value
        );
        console.log(userCrentialds.user);
        
        console.log('llega');
        
        await this.router.navigateByUrl('/home');
      } catch (err) {
        //console.log(err);
        const msg = err instanceof FirebaseError ? 'Contraseña o email incorrecto' : 'Ocurrio un error';
        //(err as Error)?.message || 'Ocurrio un error'
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: msg
        });
      } finally {
        this.isLoading = false;
      }
      
    //}
  }

  completarDatos() {
    const {email, password} = environment.usuarioPrueba;
    this.form.controls['email'].setValue(email);
    this.form.controls['password'].setValue(password);
  }
  completarDatosAdmin() {
    const {email, password} = environment.usuarioAdmin;
    this.form.controls['email'].setValue(email);
    this.form.controls['password'].setValue(password);
  }
  completarDatosPaciente() {
    const {email, password} = environment.usuarioPaciente;
    this.form.controls['email'].setValue(email);
    this.form.controls['password'].setValue(password);
  }

  completarDatosEspecialista() {
    const {email, password} = environment.usuarioEspecialista;
    this.form.controls['email'].setValue(email);
    this.form.controls['password'].setValue(password);
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
