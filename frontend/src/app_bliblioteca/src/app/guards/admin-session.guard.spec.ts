import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminSessionGuard } from './admin-session.guard';

describe('adminSessionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminSessionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
