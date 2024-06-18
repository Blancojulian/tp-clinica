import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { EspecialidadService } from '../../../services/especialidad.service';
import { UsuarioService } from '../../../services/usuario.service';
import { IUsuario } from '../../../interfaces/iusuario';
import { Subscription } from 'rxjs';
import { MatChipListbox, MatChipListboxChange } from '@angular/material/chips';
import { Turno } from '../../../interfaces/turno';
import { TurnoService } from '../../../services/turno.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrl: './turnos-paciente.component.css'
})
export class TurnosPacienteComponent implements OnInit, OnDestroy {

  listaTurnos: Turno[] = [];
  turnoSeleccionado: Turno | null = null;
  especialidadSelecionada?: string;
  especialistaSeleccionado?: IUsuario;
  mostrarFiltro = false;
  private sub!: Subscription;
  private subDatos!: Subscription;
  constructor(
    public especilidadService: EspecialidadService,
    public turnoService: TurnoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('email');
    console.log(this.authService.currentUser?.email);
    /*this.sub = this.turnoService.getTurnosPacienteObservable(this.authService.currentUser?.email || '').subscribe((lista)=>{
      this.listaTurnos = lista;
    });*/
    this.subDatos = this.authService.datosUsuario$.subscribe((u)=>{
      if (u) {
        
        this.sub?.unsubscribe();
        this.sub = this.turnoService.getTurnosPacienteObservable(u.email).subscribe((lista)=>{
          this.listaTurnos = lista;
        });
      }
    })
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.subDatos?.unsubscribe();
  }
  
  mostrarTodosLosTurnos() {
    this.sub?.unsubscribe();
    this.sub = this.turnoService.getTurnosPacienteObservable(this.authService.currentUser?.email || '').subscribe((lista)=>{
      this.listaTurnos = lista;
    });
  }

  recibirFiltro({especialidad, especialista}: {especialidad: string, especialista: IUsuario}) {
    this.especialidadSelecionada = especialidad;
    this.especialistaSeleccionado = especialista;
    this.sub?.unsubscribe();
    this.sub = this.turnoService.getTurnosPacienteObservable(
      this.authService.currentUser?.email || '',
      especialidad,
      especialista?.email
    ).subscribe((lista)=>{
      this.listaTurnos = lista;
    });
    this.mostrarFiltro = false
  }
}
