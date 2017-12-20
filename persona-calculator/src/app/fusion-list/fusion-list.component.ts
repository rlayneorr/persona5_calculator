import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';
import { Persona } from '../persona';

@Component({
  selector: 'app-fusion-list',
  templateUrl: './fusion-list.component.html',
  styleUrls: ['./fusion-list.component.css']
})
export class FusionListComponent implements OnInit {
  @Input() persona: Persona;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

}
