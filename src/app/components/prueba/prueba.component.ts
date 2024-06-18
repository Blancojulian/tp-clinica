import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IUsuario } from '../../interfaces/iusuario';
import { EspecialidadService } from '../../services/especialidad.service';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormularioModule } from '../forms/formulario.module';
import { TurnoModule } from '../turno/turno.module';
import {MatChipsModule} from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormFieldModule, 
    MatSelectModule, MatInputModule, TurnoModule, MatChipsModule],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent implements OnInit, OnDestroy {
  valor:any;
  readonly bestBoys: string[] = ['Samoyed', 'Akita Inu', 'Alaskan Malamute', 'Siberian Husky'];
  nombre: IUsuario[] = [];
  private sub!: Subscription
  constructor(
    public usuarioService: UsuarioService,
    public especialidadService: EspecialidadService
  ) {}

  darClick(ev: Event) {
    ev.preventDefault();
    console.log(this.valor);
    
  }
  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
