import { Pipe, PipeTransform } from '@angular/core';

import { Persona } from './persona';

@Pipe({
  name: 'persona'
})
export class PersonaPipe implements PipeTransform {

  transform(value: Persona[], searchText: any): Persona[] {
    if (!value) {
      return [];
    }
    searchText.toLowerCase();
    return value.filter( p => {
      let search: boolean;
      search = p.name.toLowerCase().includes(searchText);
      search = search || p.arcana.toLowerCase().includes(searchText);
      return search;
    } );
  }

}
