import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'rating' })
export class RatingStrengthPipe implements PipeTransform {
  transform(str: any): string {
    const num = parseFloat(str.replace('%', ''));
    if (num > 10) {
      return (num / 10).toFixed(1).toString();
    }
    return str;
  }
}
