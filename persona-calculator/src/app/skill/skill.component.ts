import { Component, OnInit, Input } from '@angular/core';
import { Skill } from '../skill';
import { Persona } from '../persona';
@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  @Input() public skill: Skill;
  @Input() public persona: Persona;

  constructor() { }

  ngOnInit() {
  }

  getPersonas(): any[] {
    const x = Object.getOwnPropertyNames(this.skill.personas);
    const arr = [];
    for (let i = 0; i < x.length; i++) {
      const skill = {
        'level': this.skill.personas[x[i]],
        'name': x[i]
      };
      arr.push(skill)
    }
    return arr;
  }
}
