import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { RegistroEspecialistaComponent } from './registro-especialista/registro-especialista.component';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'paciente',
    component: RegistroPacienteComponent
  },
  {
    path: 'especialista',
    component: RegistroEspecialistaComponent
  },
  {
    path: 'admin',
    component: RegistroAdminComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioRoutingModule { }
