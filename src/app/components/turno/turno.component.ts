import { Component } from '@angular/core';
import { EspecialidadService } from '../../services/especialidad.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrl: './turno.component.css'
})
export class TurnoComponent {

  constructor(
    public especialidadService: EspecialidadService,
    public usuarioService: UsuarioService
  ) {}

}
