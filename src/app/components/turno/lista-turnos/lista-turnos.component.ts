import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Turno } from '../../../interfaces/turno';

@Component({
  selector: 'app-lista-turnos',
  templateUrl: './lista-turnos.component.html',
  styleUrl: './lista-turnos.component.css'
})
export class ListaTurnosComponent {
  @Input() listaTurnos: Turno[] = [];
  @Output() onEnviarDato = new EventEmitter<Turno>();

  onClick(turno: Turno) {
    this.onEnviarDato.emit(turno);
  }
}
