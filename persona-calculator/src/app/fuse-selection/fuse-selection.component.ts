import { Component, OnInit } from '@angular/core';

import { Persona } from '../persona';
import { PersonaService } from '../persona.service';
import { FusionService } from '../fusion.service';
@Component({
  selector: 'app-fuse-selection',
  templateUrl: './fuse-selection.component.html',
  styleUrls: ['./fuse-selection.component.css']
})
export class FuseSelectionComponent implements OnInit {
  public p1: Persona;
  public p2: Persona;
  public personas: Persona[];

  constructor(
    private personaService: PersonaService,
    private fusionService: FusionService
  ) { }

  ngOnInit() {
    this.personaService.getPersonas().subscribe( personas => this.personas = personas);
  }

  addP1(persona: Persona) {
    this.p1 = persona;
  }
  addP2(persona: Persona) {
    this.p2 = persona;
  }

  fuse(): Persona  {
    return this.fusionService.fuse(this.p1, this.p2);
  }
}
