import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';
import { PersonaService } from '../persona.service';
import { FusionService } from '../fusion.service';
import { Persona } from '../persona';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-fusion-list',
  templateUrl: './fusion-list.component.html',
  styleUrls: ['./fusion-list.component.css']
})
export class FusionListComponent implements OnInit {
  @Input() persona: Persona;

  constructor(
    private dataService: DataService,
    private personaService: PersonaService,
    private fusionService: FusionService
  ) { }

  ngOnInit() {
  }
  getRecipes(): Recipe[] {
    let result: Recipe[];
    this.fusionService.getAllResultingRecipesFrom(this.persona).subscribe(recipes => result = recipes);
    console.log(result);
    return result;
  }
}
