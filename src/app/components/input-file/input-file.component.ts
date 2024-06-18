import { AfterViewInit, Component, ElementRef, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-file',
  standalone: true,
  imports: [],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileComponent),
      multi: true
    }
  ]
})
export class InputFileComponent implements ControlValueAccessor {
  @ViewChild('file') input!: ElementRef<HTMLInputElement>;
  value: File | null = null;
  disabled = false;
  onChange: any = (value: any) => {};
  onTouched: any = () => {};
  texto = 'Seleccionar archivo';
  
  selecionarArchivo() {
    const archivos = this.input.nativeElement?.files;
    const archivo = archivos ? archivos[0] : null;
    this.texto = archivo?.name || 'Seleccionar archivo';
    this.onTouched();
    this.onChange(archivo);
    this.writeValue(archivo);
    
  }

  writeValue(obj: File | null): void {
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
}
