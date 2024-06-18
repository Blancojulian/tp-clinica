import { Component, EventEmitter, Output } from '@angular/core';
import { EspecialidadService } from '../../../services/especialidad.service';

@Component({
  selector: 'app-lista-especialidades',
  templateUrl: './lista-especialidades.component.html',
  styleUrl: './lista-especialidades.component.css'
})
export class ListaEspecialidadesComponent {

  @Output() onEnviarDato = new EventEmitter<string>();
  
  constructor(public especialidadService: EspecialidadService) {}

  onClick(especialidad: string) {
    this.onEnviarDato.emit(especialidad);
  }
}
