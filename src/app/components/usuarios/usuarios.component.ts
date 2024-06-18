import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Timestamp } from '@angular/fire/firestore';
import { IUsuario } from '../../interfaces/iusuario';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarioSeleccionado!: IUsuario;
  //hacer un pipe para Timestamp to Date
  constructor(public usuarioService: UsuarioService) {
    const f = new Timestamp(20,1);
    f.toDate()
  }

  public onClick(u: IUsuario) {
    this.usuarioSeleccionado = u;
  }

  public recibirUsuario({u, aprobado}:{u: IUsuario, aprobado: boolean}) {
    console.log(u);
    u.fechaAprobado = aprobado ? new Date() : null;
    this.usuarioService.updateUsuario(u.email, u);
  }
}
