import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { bibliotecarioSessionGuard } from './bibliotecario-session.guard';

describe('bibliotecarioSessionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => bibliotecarioSessionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
