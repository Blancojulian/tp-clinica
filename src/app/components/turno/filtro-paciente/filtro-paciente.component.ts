import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EspecialidadService } from '../../../services/especialidad.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Subscription } from 'rxjs';
import { IUsuario } from '../../../interfaces/iusuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Especialidad } from '../../../interfaces/especialidad';
import { MatStepper } from '@angular/material/stepper';
import { TurnoService } from '../../../services/turno.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-filtro-paciente',
  templateUrl: './filtro-paciente.component.html',
  styleUrl: './filtro-paciente.component.css'
})
export class FiltroPacienteComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') elem!: MatStepper;
  @Output() onEnviarDato = new EventEmitter<{especialidad: string, paciente: IUsuario}>();
  
  fgEspecialidades = this.formBuilder.group({
    especialidad: ['', Validators.required],
  });
  fgPaciente = this.formBuilder.group({
    paciente: new FormControl<null | IUsuario>(null, Validators.required),
  });
  isEditable = true;

  listaPacientes: IUsuario[] = [];
  listaEspecialidades: string[] = [];
  //subEspecialidad!: Subscription;
  //subPaciente!: Subscription;
  subAuth!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    public especialidadService: EspecialidadService,
    public usuarioService: UsuarioService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    
    this.subAuth = this.authService.datosUsuario$.subscribe(u=> {
      if (u) {
        this.listaEspecialidades = this.authService.datosUsuario?.especialidades || [];
        
      }
    });
    
  }
  ngOnDestroy(): void {
    this.subAuth?.unsubscribe();
  }
  public async onChange(ev: StepperSelectionEvent) {
    
    if (ev.selectedStep.stepControl === this.fgPaciente && 
      this.fgEspecialidades.controls['especialidad'].valid && this.authService.datosUsuario?.email &&
      this.fgEspecialidades.controls['especialidad'].value) {
      /*
      this.subPaciente?.unsubscribe();
      this.subPaciente = this.usuarioService.getUsuariosPorEspecialidad(this.fgEspecialidades.controls['especialidad'].value).subscribe((lista)=>{
        
        this.listaPacientes = lista;
      });*/
      this.listaPacientes = await this.usuarioService.getPacientesAsignadosPorEspecialidad(this.authService.datosUsuario.email, this.fgEspecialidades.controls['especialidad'].value)
    } else if (ev.selectedStep.stepControl === this.fgEspecialidades) {
      //this.subPaciente?.unsubscribe();
      this.fgPaciente.controls['paciente'].setValue(null);
      /*this.subEspecialidad = this.especialidadService.listaEspecialidades$.subscribe((lista)=>{
        this.listaEspecialidades = lista;
      });*/
    } else if (this.elem.steps.last === ev.selectedStep) {
      
    }
  }

  onClick(ev: Event) {
    ev.preventDefault();
    //this.subEspecialidad?.unsubscribe();
    //this.subPaciente?.unsubscribe();
    
    const u = this.fgPaciente.controls['paciente'].value
    if (this.fgEspecialidades.controls['especialidad'].value) {
      
        const datos = {
          especialidad: this.fgEspecialidades.controls['especialidad'].value as string,
          paciente: this.fgPaciente.controls['paciente'].value as IUsuario
        }
        this.onEnviarDato.emit(datos);
        
    }
  }

  
  public get tituloStepEspecialista() : string {
    return this.fgPaciente.controls['paciente'].value ?
    this.fgPaciente.controls['paciente'].value['apellido'] + ' ' + this.fgPaciente.controls['paciente'].value['nombre'] :
    'Ingrese especialista';
  }
  
}
