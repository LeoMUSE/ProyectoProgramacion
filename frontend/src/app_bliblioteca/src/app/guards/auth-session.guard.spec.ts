import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authSessionGuard } from './auth-session.guard';

describe('authSessionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authSessionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
