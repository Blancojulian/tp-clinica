import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'edadFecha',
  standalone: true
})
export class EdadFechaPipe implements PipeTransform {

  transform(value: Date | Timestamp/*, ...args: unknown[]*/): number | null {
    if (!value) {
      return null;
    }
    const fechaHoy = new Date();
    let f ;
    if (value instanceof Timestamp) {
      value = value.toDate();
    }


    return fechaHoy.getFullYear() - value.getFullYear();
  }

}
