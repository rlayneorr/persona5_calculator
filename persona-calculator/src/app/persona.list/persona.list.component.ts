import { Component, OnInit } from '@angular/core';

import { Persona } from '../persona';
import { DataService } from '../data.service';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona.list.component.html',
  styleUrls: ['./persona.list.component.css']
})
export class PersonaListComponent implements OnInit {
  public personas: Persona[];
  public search: string;
  public asc = true;
  constructor(
    private personaService: PersonaService
  ) { }

  ngOnInit() {
    this.personaService.getPersonas().subscribe(personas => this.personas = personas);
    this.search = '';
  }

  sortByStat(n: number): void {
    if (this.asc) {
      this.personas.sort((a, b) => a.stats[n] - b.stats[n]);
      this.asc = !this.asc;
    } else {
      this.personas.sort((a, b) => b.stats[n] - a.stats[n]);
      this.asc = !this.asc;
    }
  }

  sortByArcana(): void {
    if (this.asc) {
      // nested ternaries, because I am trash.
      this.personas.sort( (a, b) => a.arcana === b.arcana ? 0 : (a.arcana > b.arcana ? 1 : -1));
      this.asc = !this.asc;
    } else {
      this.personas.sort( (a, b) => a.arcana === b.arcana ? 0 : (a.arcana > b.arcana ? -1 : 1));
      this.asc = !this.asc;
    }
  }

  sortByName(): void {
    if (this.asc) {
      // nested ternaries, because I am trash.
      this.personas.sort( (a, b) => a.name === b.name ? 0 : (a.name > b.name ? 1 : -1));
      this.asc = !this.asc;
    } else {
      this.personas.sort( (a, b) => a.name === b.name ? 0 : (a.name > b.name ? -1 : 1));
      this.asc = !this.asc;
    }
  }

  sortByElem(n: number): void {
    if (this.asc) {
      this.personas.sort( (a, b) => this.assignWeaknesses(a.elems[n]) - this.assignWeaknesses(b.elems[n]) );
      this.asc = !this.asc;
    } else {
      this.personas.sort( (a, b) => this.assignWeaknesses(b.elems[n]) - this.assignWeaknesses(a.elems[n]) );
      this.asc = !this.asc;
    }
  }

  private assignWeaknesses (switchValue): number {
    switch (switchValue) {
      case 'wk':
        return 0;
      case '-':
        return 1;
      case 'rs':
        return 2;
      case 'nu':
        return 3;
      case 'ab':
        return 4;
      case 'rp':
        return 6;
      default:
        return -1;
    }
  }

}
