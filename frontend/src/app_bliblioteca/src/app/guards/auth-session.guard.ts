import { CanActivateFn, Router } from '@angular/router';
import { Inject, inject } from '@angular/core';

export const authSessionGuard: CanActivateFn = (route, state) => {

  const router: Router = Inject(Router);
  const token = localStorage.getItem('token');

  if(!token) {
    router.navigateByUrl('login');
    return false;
  } else {
    return true;
  }
};
