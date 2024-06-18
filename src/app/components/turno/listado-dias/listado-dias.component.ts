import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TurnoService } from '../../../services/turno.service';
import { Dia } from '../../../models/dia';

@Component({
  selector: 'app-listado-dias',
  templateUrl: './listado-dias.component.html',
  styleUrl: './listado-dias.component.css'
})
export class ListadoDiasComponent {
  @Input() email = '';
  fechaHoy = new Date();
  diaSeleccionado?: number;
  indexMesSeleccionado?: number;
  horaSeleccionada?: string;
  duracion?: number = 30;
  private readonly diaNombres = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  public readonly dias: Dia[];
  @Output() onEnviarDato = new EventEmitter<{fecha: Date, duracion: number}>();

  fechaSeleccionado: any;
  
  constructor(private turnoService: TurnoService) {
    this.dias = this.getDias();
  }

  onClickTable(ev: Event) {
    ev.preventDefault();
    const target = ev.target as HTMLDivElement;
    const atrFecha = target.getAttribute('fecha');
    console.log(atrFecha);
    
    if (atrFecha) {
      console.log(atrFecha);
      this.fechaSeleccionado = atrFecha;
    }

  }

  onClick(ev: Event) {
    ev.preventDefault();
    const target = ev.target as HTMLDivElement;
    console.log('duracion '+this.duracion);
    
    console.log(target.getAttribute('indexMes'));
    console.log(target.getAttribute('dia'));
    console.log(target.getAttribute('hora'));
    const atrDia = target.getAttribute('dia');
    const atrHora = target.getAttribute('hora');
    const atrIndexMes = target.getAttribute('indexMes');
    if (atrDia && atrHora && atrIndexMes) {
      this.diaSeleccionado = parseInt(atrDia);
      this.indexMesSeleccionado = parseInt(atrIndexMes);
      this.horaSeleccionada = atrHora;
    }
    this.onEnviarDato.emit({fecha: new Date(), duracion: 30});
  }

  getDias() {
    const indexPrimerDia = this.fechaHoy.getDay();
    console.log(indexPrimerDia);
    const fechaHoy = new Date();

    const ultimoDia = new Date(fechaHoy.getFullYear(), fechaHoy.getMonth(), fechaHoy.getDate() + 15);

    const arr = []
    for (let i = new Date(fechaHoy); i <= ultimoDia; i.setDate(i.getDate()+1)) {
      arr.push(new Dia(this.diaNombres[i.getDay()], i.getDate(), i.getMonth()));
    }
    return arr;
  }
}
