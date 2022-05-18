import { Pipe, PipeTransform } from '@angular/core';
import { GENRES } from '../consts/genres.const';

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

@Pipe({ name: 'genre' })
export class GenresPipe implements PipeTransform {
  transform(str: string): string {
    for (const [key, value] of Object.entries(GENRES)) {
      if (str == value) {
        str = '_' + key;
      }
    }
    return str;
  }
}
