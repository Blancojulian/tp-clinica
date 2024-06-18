import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { EspecialidadService } from '../../../services/especialidad.service';
import { IUsuario } from '../../../interfaces/iusuario';
import { Subscription } from 'rxjs';
import { Turno } from '../../../interfaces/turno';
import { TurnoService } from '../../../services/turno.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-turnos-especialista',
  templateUrl: './turnos-especialista.component.html',
  styleUrl: './turnos-especialista.component.css'
})
export class TurnosEspecialistaComponent implements OnInit, OnDestroy {

  listaTurnos: Turno[] = [];
  turnoSeleccionado: Turno | null = null;
  especialidadSelecionada?: string;
  pacienteSeleccionado?: IUsuario;
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
        this.sub = this.turnoService.getTurnosEspecilistaObservable(u.email).subscribe((lista)=>{
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
    this.sub = this.turnoService.getTurnosEspecilistaObservable(this.authService.currentUser?.email || '').subscribe((lista)=>{
      this.listaTurnos = lista;
    });
  }

  recibirFiltro({especialidad, paciente}: {especialidad: string, paciente: IUsuario}) {
    this.especialidadSelecionada = especialidad;
    this.pacienteSeleccionado = paciente;
    this.sub?.unsubscribe();
    this.sub = this.turnoService.getTurnosEspecilistaObservable(
      this.authService.currentUser?.email || '',
      especialidad,
      paciente?.email
    ).subscribe((lista)=>{
      this.listaTurnos = lista;
    });
    this.mostrarFiltro = false
  }
}
