import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EspecialidadService } from '../../../services/especialidad.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Subscription } from 'rxjs';
import { IUsuario } from '../../../interfaces/iusuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Especialidad } from '../../../interfaces/especialidad';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-filtro-especialista',
  templateUrl: './filtro-especialista.component.html',
  styleUrl: './filtro-especialista.component.css'
})
export class FiltroEspecialistaComponent implements OnInit {
  @ViewChild('stepper') elem!: MatStepper;
  @Output() onEnviarDato = new EventEmitter<{especialidad: string, especialista: IUsuario}>();
  fgEspecialidades = this.formBuilder.group({
    especialidad: ['', Validators.required],
  });
  fgEspecialista = this.formBuilder.group({
    especialista: new FormControl<null | IUsuario>(null, Validators.required),
  });
  isEditable = true;

  listaEspecialistas: IUsuario[] = [];
  listaEspecialidades: Especialidad[] = [];
  subEspecialidad!: Subscription;
  subEspecialista!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    public especialidadService: EspecialidadService,
    public usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.subEspecialidad = this.especialidadService.listaEspecialidades$.subscribe((lista)=>{
      this.listaEspecialidades = lista;
    });
  }
  public onChange(ev: StepperSelectionEvent) {
    
    if (ev.selectedStep.stepControl === this.fgEspecialista && 
      this.fgEspecialidades.controls['especialidad'].valid && 
      this.fgEspecialidades.controls['especialidad'].value) {
      
      this.subEspecialista?.unsubscribe();
      this.subEspecialista = this.usuarioService.getUsuariosPorEspecialidad(this.fgEspecialidades.controls['especialidad'].value).subscribe((lista)=>{
        
        this.listaEspecialistas = lista;
      });
    } else if (ev.selectedStep.stepControl === this.fgEspecialidades) {
      this.subEspecialista?.unsubscribe();
      this.fgEspecialista.controls['especialista'].setValue(null);
      this.subEspecialidad = this.especialidadService.listaEspecialidades$.subscribe((lista)=>{
        this.listaEspecialidades = lista;
      });
    } else if (this.elem.steps.last === ev.selectedStep) {
      
    }
  }

  onClick(ev: Event) {
    ev.preventDefault();
    this.subEspecialidad?.unsubscribe();
    this.subEspecialista?.unsubscribe();
    
    const u = this.fgEspecialista.controls['especialista'].value
    if (this.fgEspecialidades.controls['especialidad'].value &&
       u instanceof Object) {
      
        const datos = {
          especialidad: this.fgEspecialidades.controls['especialidad'].value as string,
          especialista: this.fgEspecialista.controls['especialista'].value as IUsuario
        }
        this.onEnviarDato.emit(datos);
        console.log(datos);
        
    }
  }

  
  public get tituloStepEspecialista() : string {
    return this.fgEspecialista.controls['especialista'].value ?
    this.fgEspecialista.controls['especialista'].value['apellido'] + ' ' + this.fgEspecialista.controls['especialista'].value['nombre'] :
    'Ingrese especialista';
  }
  
}
