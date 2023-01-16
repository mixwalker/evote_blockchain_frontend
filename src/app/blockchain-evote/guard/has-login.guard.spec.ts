import { TestBed } from '@angular/core/testing';

import { HasLoginGuard } from './has-login.guard';

describe('HasLoginGuard', () => {
  let guard: HasLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
