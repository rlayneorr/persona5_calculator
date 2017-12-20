import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonaComponent } from './persona/persona.component';
import { PersonaListComponent } from './persona.list/persona.list.component';

import { PersonaService } from './persona.service';
import { DataService } from './data.service';
import { Persona } from './persona';
import { AppRoutingModule } from './app-routing.module';
import { PersonaPipe } from './persona.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    PersonaListComponent,
    PersonaPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [PersonaService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
