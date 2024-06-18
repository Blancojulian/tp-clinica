import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'booleanFecha',
  standalone: true
})
export class BooleanFechaPipe implements PipeTransform {

  transform(value?: Date | Timestamp | null): boolean {
    return !!value;
  }

}
