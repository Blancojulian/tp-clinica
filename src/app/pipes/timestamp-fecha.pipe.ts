import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'timestampFecha',
  standalone: true
})
export class TimestampFechaPipe implements PipeTransform {

  transform(value: any): Date | undefined {
    if (value instanceof Timestamp) {
      value = value.toDate();
    }
    return value;
  }

}
