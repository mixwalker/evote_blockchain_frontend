import { TestBed } from '@angular/core/testing';

import { HasAdminloginGuard } from './has-adminlogin.guard';

describe('HasAdminloginGuard', () => {
  let guard: HasAdminloginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasAdminloginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
