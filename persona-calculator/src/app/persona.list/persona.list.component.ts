import { Component, OnInit } from '@angular/core';

import { Persona } from '../persona';
import { DataService } from '../data.service';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent implements OnInit {
  public personas: Persona[];
  constructor(
    private personaService: PersonaService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.personaService.getPersonas().subscribe(personas => this.personas = personas);
  }

}
