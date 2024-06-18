import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IUsuario } from '../../../../interfaces/iusuario';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrl: './detalle-usuario.component.css'
})
export class DetalleUsuarioComponent implements OnChanges {
  
  @Output() onEnviarDato = new EventEmitter<{u: IUsuario, aprobado: boolean}>()
  @Input() usuario!: IUsuario;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario']) {
      //this.usuario.fechaAprobado = this.usuario.fechaAprobado instanceof Timestamp ? 
      //this.usuario.fechaAprobado.toDate() : this.usuario.fechaAprobado;
      
    }
  }
  aprobarEspecialista(){

    this.onEnviarDato.emit({u: this.usuario, aprobado: !!!this.usuario.fechaAprobado});
  }
}
