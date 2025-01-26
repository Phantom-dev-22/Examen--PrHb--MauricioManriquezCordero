import { Pipe, PipeTransform } from '@angular/core'; // importa los módulos de pipe y transformación
import { DatePipe } from '@angular/common'; // importa el módulo de fecha

@Pipe({
  name: 'dateFormat', // nombre del pipe
  standalone: true // pipe independiente
})
export class DateFormatPipe implements PipeTransform { // clase de formato de fecha
transform(value: string): string { // transforma el valor
  return new DatePipe('es-CL').transform(value, 'yyyy-MM-dd') || ''; // formato de fecha
}
}