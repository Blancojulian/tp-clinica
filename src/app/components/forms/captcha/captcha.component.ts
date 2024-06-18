import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CaptchaComponent),
      multi: true
    }
  ]
})
export class CaptchaComponent implements ControlValueAccessor, AfterViewInit {
  
  

  @ViewChild('canvas') canvasElem!: ElementRef<HTMLCanvasElement>;
  @Output() onEnviarDato = new EventEmitter();
  private value = false;
  private caracteres = '';
  public texto = '';
  disabled = false;
  onChange: any = (value: any) => {};
  onTouched: any = () => {};

  ngAfterViewInit(): void {
    this.caracteres = this.generarLetras(5);
    this.dibujarCaracteres(this.caracteres);
  }

  onClick(event: Event) {
    event.preventDefault();
    console.log('onSubmit canvas');
    this.caracteres = this.generarLetras(5);
    this.dibujarCaracteres(this.caracteres);
    this.texto = '';
  }

  onChangeInput() {
    const esValido = this.caracteres === this.texto;
    console.log('es valido '+this.value);
    this.onTouched();
    this.onChange(esValido);
    this.writeValue(esValido);
  }

  writeValue(obj: boolean): void {
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

  private dibujarCaracteres(caracteres: string) {
    const canvas = this.canvasElem?.nativeElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx) {
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.dibujarLineas(6, canvas, ctx);
    const maxWidth = canvas.width/caracteres.length;
    const comienzoY = canvas.height/3;
    let ultimaPosicionX = 10;
    for (let i = 0; i < caracteres.length; i++) {
      const caracter = caracteres[i];
      const x = ultimaPosicionX// Math.random() * 5 + ultimaPosicionX;
      ultimaPosicionX = x + maxWidth;

      const y = comienzoY + Math.random() * 5;//antes era 20
      const sDeg = (Math.random()*20*Math.PI) / 180;
      ctx.font = maxWidth + "px arial italic bold";

      ctx.rotate(sDeg);
      ctx.fillStyle = this.getColorAleatorio();
      ctx.fillText(caracter, x, y, maxWidth*0.98);
      ctx.rotate(-sDeg);
    }
    

  }

  private dibujarLineas(cantidadLineas: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    
    let x = 0;// = Math.random() * canvas.width;
    let y = 0;// = Math.random() * canvas.height;
    let str = '';
    for (let i = 0; i < cantidadLineas; i++) {
      
      ctx.strokeStyle = this.getColorAleatorio();
      ctx.lineWidth = Math.floor(Math.random() * 4);
      
      ctx.beginPath();
      x = Math.random() * canvas.width;
      y = Math.random() * canvas.height;
      ctx.moveTo(x, y);
      x = Math.random() * canvas.width;
      y = Math.random() * canvas.height;
      ctx.lineTo(x, y);
      ctx.stroke();
      
    }
  }

  private getNumeroAleatorio(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getColorAleatorio () {
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  private getCaracterAleatorio() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const limite = (caracteres.length-1);
    return caracteres.charAt(Math.floor(Math.random() * limite));
  }

  private generarLetras(cantidadCaracteres: number) {
    let resultado = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const limite = (caracteres.length-1);
    while (cantidadCaracteres > 0) {
      resultado += caracteres.charAt(Math.floor(Math.random() * limite));
      cantidadCaracteres--;
    }
    return resultado;
  }
}
