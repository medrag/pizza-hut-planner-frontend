import { TestBed } from '@angular/core/testing';

import { EmployeePlanningService } from './employee-planning.service';

describe('EmployeePlanningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeePlanningService = TestBed.get(EmployeePlanningService);
    expect(service).toBeTruthy();
  });
});
