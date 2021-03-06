import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';

import { PersonaListComponent } from './persona.list/persona.list.component';
import { PersonaComponent } from './persona/persona.component';
import { FuseSelectionComponent } from './fuse-selection/fuse-selection.component';
import { SkillListComponent } from './skill-list/skill-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: PersonaListComponent
  },
  {
    path: 'persona/:persona',
    component: PersonaComponent
  },
  {
    path: 'fusion',
    component: FuseSelectionComponent
  },
  {
    path: 'skill',
    component: SkillListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
