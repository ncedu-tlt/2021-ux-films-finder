import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'rating' })
export class RatingPipe implements PipeTransform {
  transform(str: string): string {
    const num = parseFloat(str.replace('%', ''));
    if (num > 10) {
      return (num / 10).toFixed(1).toString();
    }
    return str;
  }
}
