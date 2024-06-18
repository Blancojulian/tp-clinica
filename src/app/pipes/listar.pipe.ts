import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listar',
  standalone: true
})
export class ListarPipe implements PipeTransform {

  transform(lista?: string[]): string | null {
    if (!lista) {
      return null;
    }
    return lista.join(', ');
  }

}
