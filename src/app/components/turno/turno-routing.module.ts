import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnosAdminComponent } from './turnos-admin/turnos-admin.component';
import { TurnosPacienteComponent } from './turnos-paciente/turnos-paciente.component';
import { TurnosEspecialistaComponent } from './turnos-especialista/turnos-especialista.component';
import { rolGuard } from '../../guards/rol.guard';

const routes: Routes = [
  {
    path: 'admin',
    data: {
      rol: 'admin'
    },
    canActivate: [rolGuard],
    component: TurnosAdminComponent
  },
  {
    path: 'paciente',
    data: {
      rol: 'paciente'
    },
    canActivate: [rolGuard],
    component: TurnosPacienteComponent
  },
  {
    path: 'especialista',
    data: {
      rol: 'especialista'
    },
    canActivate: [rolGuard],
    component: TurnosEspecialistaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnoRoutingModule { }
