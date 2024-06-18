import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appSeleccionado]',
  standalone: true
})
export class SeleccionadoDirective implements OnInit, OnChanges{

  @Input() appSeleccionado: boolean = false;
  @HostBinding('style.backgroundColor') backgroundColor: string = 'inherit';

  constructor(private elem: ElementRef) { }

  ngOnInit(): void {
    this.updateBackgroundColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appSeleccionado']) {
      this.updateBackgroundColor();
    }
  }

  updateBackgroundColor() {
    this.backgroundColor = this.appSeleccionado ? '#68FF33' : 'inherit';
  }
}
