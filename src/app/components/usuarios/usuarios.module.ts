import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { DetalleUsuarioComponent } from './components/detalle-usuario/detalle-usuario.component';
import { UsuariosComponent } from './usuarios.component';
import {MatButtonModule} from '@angular/material/button';
import { EdadFechaPipe } from '../../pipes/edad-fecha.pipe';
import { BooleanFechaPipe } from '../../pipes/boolean-fecha.pipe';
import { TimestampFechaPipe } from '../../pipes/timestamp-fecha.pipe';
import {MatCardModule} from '@angular/material/card';
import { ListarPipe } from '../../pipes/listar.pipe';

@NgModule({
  declarations: [
    UsuariosComponent,
    DetalleUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    CommonModule, MatCardModule, MatButtonModule, EdadFechaPipe, 
    BooleanFechaPipe, TimestampFechaPipe, ListarPipe

  ]
})
export class UsuariosModule { }
