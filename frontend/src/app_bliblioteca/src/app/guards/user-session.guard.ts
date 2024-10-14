import { CanActivateFn, Router } from '@angular/router';
import { Inject } from '@angular/core';

export const userSessionGuard: CanActivateFn = (route, state) => {

  const router: Router = Inject(Router);
  const token = localStorage.getItem('token');
  const tokenRol = localStorage.getItem('token_rol')

  if (token && tokenRol && (tokenRol.includes('Usuario') || tokenRol.includes('Admin'))) {
    return true
  } else {
    router.navigateByUrl('login')
    return false
  }
};
