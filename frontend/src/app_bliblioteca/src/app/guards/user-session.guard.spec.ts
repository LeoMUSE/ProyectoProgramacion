import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userSessionGuard } from './user-session.guard';

describe('userSessionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userSessionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
