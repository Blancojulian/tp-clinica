import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnoRoutingModule } from './turno-routing.module';
import { TurnoComponent } from './turno.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { ListaEspecialistasComponent } from './lista-especialistas/lista-especialistas.component';
import { ListaEspecialidadesComponent } from './lista-especialidades/lista-especialidades.component';
import { ListadoDiasComponent } from './listado-dias/listado-dias.component';
import { ListaTurnosComponent } from './lista-turnos/lista-turnos.component';
import { SeleccionadoDirective } from '../../directives/seleccionado.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TurnosPacienteComponent } from './turnos-paciente/turnos-paciente.component';
import { TurnosEspecialistaComponent } from './turnos-especialista/turnos-especialista.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import { FiltroEspecialistaComponent } from './filtro-especialista/filtro-especialista.component';
import { FiltroPacienteComponent } from './filtro-paciente/filtro-paciente.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { TimestampFechaPipe } from '../../pipes/timestamp-fecha.pipe';
import { TurnosAdminComponent } from './turnos-admin/turnos-admin.component';

@NgModule({
  declarations: [
    TurnoComponent,
    SolicitarTurnoComponent,
    ListaEspecialistasComponent,
    ListaEspecialidadesComponent,
    ListadoDiasComponent,
    ListaTurnosComponent,
    TurnosPacienteComponent,
    TurnosEspecialistaComponent,
    FiltroEspecialistaComponent,
    FiltroPacienteComponent,
    TurnosAdminComponent
  ],
  imports: [
    CommonModule,
    TurnoRoutingModule,
    SeleccionadoDirective, FormsModule, ReactiveFormsModule,
    MatButtonToggleModule, MatChipsModule, MatStepperModule,
    MatFormFieldModule, MatButtonModule, MatInputModule, TimestampFechaPipe
  ],
  exports: [
    SolicitarTurnoComponent,
    TurnosPacienteComponent
  ]
})
export class TurnoModule { }
