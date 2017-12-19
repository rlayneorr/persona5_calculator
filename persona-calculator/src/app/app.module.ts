import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonaComponent } from './persona/persona.component';
import { PersonaListComponent } from './persona.list/persona.list.component';

import { PersonaService } from './persona.service';
import { DataService } from './data.service';
import { Persona } from './persona';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    PersonaListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PersonaService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
