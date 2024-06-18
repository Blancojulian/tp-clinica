import { Component } from '@angular/core';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrl: './solicitar-turno.component.css'
})
export class SolicitarTurnoComponent {
  public especialidadSeleccionada = '';
  public emailSeleccionado = '';


  recibirEspecialidad(especialidad: string) {
    this.especialidadSeleccionada = especialidad;
  }
  recibirEmail(email: string) {
    this.emailSeleccionado = email;
  }
}
