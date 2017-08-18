import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TagsPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'tags',
})
export class TagsPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args): Array<String> {
    if (!value) {
      return [];
    }
    return value.split(' ').map(value => value.trim());
  }
}
