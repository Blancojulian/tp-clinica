import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'fecha',
  standalone: true
})
export class FechaPipe implements PipeTransform {

  transform(fecha?: Date | Timestamp, ...args: unknown[]): unknown {
    return null;
  }

}
