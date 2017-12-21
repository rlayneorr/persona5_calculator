import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonaComponent } from './persona/persona.component';
import { PersonaListComponent } from './persona.list/persona.list.component';

import { PersonaService } from './persona.service';
import { DataService } from './data.service';
import { FusionService } from './fusion.service';
import { Persona } from './persona';
import { AppRoutingModule } from './app-routing.module';
import { PersonaPipe } from './persona.pipe';
import { FusionListComponent } from './fusion-list/fusion-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FuseSelectionComponent } from './fuse-selection/fuse-selection.component';
import { SkillComponent } from './skill/skill.component';
import { SkillService } from './skill.service';
import { SkillListComponent } from './skill-list/skill-list.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    PersonaListComponent,
    PersonaPipe,
    FusionListComponent,
    RecipeComponent,
    FuseSelectionComponent,
    SkillComponent,
    SkillListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [PersonaService, DataService, FusionService, SkillService],
  bootstrap: [AppComponent]
})
export class AppModule { }
