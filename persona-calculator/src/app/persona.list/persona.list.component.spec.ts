import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Persona.ListComponent } from './persona.list.component';

describe('Persona.ListComponent', () => {
  let component: Persona.ListComponent;
  let fixture: ComponentFixture<Persona.ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Persona.ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Persona.ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
