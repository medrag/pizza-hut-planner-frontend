import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningEmployeeComponent } from './planning-employee.component';

describe('PlanningEmployeeComponent', () => {
  let component: PlanningEmployeeComponent;
  let fixture: ComponentFixture<PlanningEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
