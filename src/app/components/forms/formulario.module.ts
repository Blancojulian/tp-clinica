import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

import { FormularioRoutingModule } from './formulario-routing.module';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';
import { RegistroEspecialistaComponent } from './registro-especialista/registro-especialista.component';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OpcionUsuarioComponent } from '../opcion-usuario/opcion-usuario.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatDialog
} from '@angular/material/dialog';
import { DialogEspecialidadComponent } from '../dialog-especialidad/dialog-especialidad.component';
import {MatInputModule} from '@angular/material/input';
import { CaptchaComponent } from './captcha/captcha.component';
import { MatCardModule } from '@angular/material/card';
import { InputFileComponent } from './input-file/input-file.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
//import { NativeDateModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { DATE_FORMATS } from './date-formats';
@NgModule({
  declarations: [
    RegistroPacienteComponent,
    RegistroAdminComponent,
    RegistroEspecialistaComponent,
    LoginComponent,
    CaptchaComponent,
    InputFileComponent,
  ],
  providers: [
    provideMomentDateAdapter(DATE_FORMATS)
  ],
  imports: [
    CommonModule,
    FormularioRoutingModule, FormsModule,
    ReactiveFormsModule, CommonModule, NgClass, MatFormFieldModule, MatSelectModule, 
    MatButtonModule, MatCardModule, MatProgressSpinnerModule, OpcionUsuarioComponent,
    MatInputModule, MatIconModule, MatDatepickerModule, MatNativeDateModule
  ],
  exports: [
    RegistroPacienteComponent,
    RegistroAdminComponent,
    RegistroEspecialistaComponent,
    LoginComponent,
    CaptchaComponent
  ]
})
export class FormularioModule { }
