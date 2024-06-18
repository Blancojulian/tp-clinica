import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Subscription } from 'rxjs';
import { IUsuario } from '../../../interfaces/iusuario';

@Component({
  selector: 'app-lista-especialistas',
  templateUrl: './lista-especialistas.component.html',
  styleUrl: './lista-especialistas.component.css'
})
export class ListaEspecialistasComponent implements OnInit, OnChanges {

  @Input() especialidad = '';
  @Output() onEnviarDato = new EventEmitter<string>();
  private sub!: Subscription;
  especialistaSeleccionado: null | IUsuario = null;
  listaEspecialistas: IUsuario[] = [];
  constructor(public usuarioService: UsuarioService) {}

  onClick(u: IUsuario) {
    this.especialistaSeleccionado = u;
    this.onEnviarDato.emit(u.email);
  }
  ngOnInit(): void {
    this.sub = this.usuarioService.getUsuariosPorEspecialidad(this.especialidad).subscribe((lista)=>{
      this.listaEspecialistas = lista;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['especialidad']) {
      this.sub?.unsubscribe();
      this.sub = this.usuarioService.getUsuariosPorEspecialidad(this.especialidad).subscribe((lista)=>{
        this.listaEspecialistas = lista;
      });
    }
  }
}
