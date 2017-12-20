import { Component, OnInit } from '@angular/core';
import { Persona } from '../persona';
import { PersonaService } from '../persona.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  public persona: Persona;
  public level: number;

  constructor(
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const persona = this.route.snapshot.paramMap.get('persona');
    this.personaService.getPersona(persona).subscribe(
      p => {
        this.persona = p;
        this.level = p.level;
      }
    );
  }

  goBack() {
    this.router.navigate(['/home']);
  }
  maxStat( startStat: number ): number {
    const max = startStat + (3 * (99 - this.persona.level ));
    return max > 99 ? 99 : max;
  }
}
