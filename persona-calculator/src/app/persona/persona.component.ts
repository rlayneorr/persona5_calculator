import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../persona';
import { Recipe } from '../recipe';
import { PersonaService } from '../persona.service';
import { FusionService } from '../fusion.service';
import { SkillService } from '../skill.service';
import { Skill } from '../skill';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  @Input() public persona: Persona;
  public skills: Skill[];
  public level: number;

  constructor(
    private personaService: PersonaService,
    private fusionService: FusionService,
    private skillService: SkillService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const persona = this.route.snapshot.paramMap.get('persona');
    this.skills = [];
    if (persona) {
      this.personaService.getPersona(persona).subscribe(
        p => {
          this.persona = p;
          this.level = p.level;
          const skills = Object.getOwnPropertyNames(this.persona.skills);
          skills.forEach(s => 
            this.skillService.getSkill(s).subscribe(
              skill => this.skills.push(skill)
            )
          )
        }
      );
    }
    if (this.persona) {
      this.level = this.persona.level;
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
  maxStat(startStat: number): number {
    const max = startStat + (3 * (99 - this.persona.level));
    return max > 99 ? 99 : max;
  }
}
