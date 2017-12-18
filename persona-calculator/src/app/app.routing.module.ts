import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonaListComponent } from './persona.list/persona.list.component';
import { PersonaComponent } from './persona/persona.component';

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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [RouterModule]
})
export class AppRoutingModule { }
