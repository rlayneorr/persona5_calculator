import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuseSelectionComponent } from './fuse-selection.component';

describe('FuseSelectionComponent', () => {
  let component: FuseSelectionComponent;
  let fixture: ComponentFixture<FuseSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuseSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuseSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
