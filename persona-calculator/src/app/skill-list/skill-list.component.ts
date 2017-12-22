import { Component, OnInit } from '@angular/core';
import { Skill } from '../skill';
import { SkillService } from '../skill.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {
  public skills: Skill[];

  constructor(
    private skillService: SkillService
  ) { }

  ngOnInit() {
    this.skillService.getSkills().subscribe(s => this.skills = s);
  }

}
