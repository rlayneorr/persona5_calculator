import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FusionListComponent } from './fusion-list.component';

describe('FusionListComponent', () => {
  let component: FusionListComponent;
  let fixture: ComponentFixture<FusionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FusionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FusionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
