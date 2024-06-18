import { Component, EventEmitter, HostListener, Input, Output, Type, forwardRef } from '@angular/core';
import { Roles } from '../../interfaces/iusuario';
import { SeleccionadoDirective } from '../../directives/seleccionado.directive';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormControlOptions, RadioControlValueAccessor } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-opcion-usuario',
  standalone: true,
  imports: [SeleccionadoDirective, TitleCasePipe],
  templateUrl: './opcion-usuario.component.html',
  styleUrl: './opcion-usuario.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OpcionUsuarioComponent),
      multi: true
    }
  ]
})
export class OpcionUsuarioComponent implements ControlValueAccessor {

  //ver que no haya problema si esta el rol admin, que no se tendria que usar
  @Output() onEnviarDato = new EventEmitter<Roles>();
  @Input() opciones: Roles[] = [];
  public opSeleccionada!: Roles;
  value: string = '';
  disabled = false;
  onChange: any = (value: any) => {};
  onTouched: any = () => {};

  enviarDato() {    
    this.onEnviarDato.emit(this.opSeleccionada);
  }

  onClick(opcion: Roles) {
    this.opSeleccionada = opcion;
    this.value = opcion;
    this.onTouched();
    this.onChange(opcion);
    //this.writeValue(opcion)
    this.enviarDato();
    
  }

  writeValue(obj: string): void {
    if (obj !== null) {
      this.value = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener('focus') onFocusOut() {
    console.log('HostListener en opciones');
    
    this.onTouched();
  }
}