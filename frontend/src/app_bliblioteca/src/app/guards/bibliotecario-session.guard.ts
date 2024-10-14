import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const bibliotecarioSessionGuard: CanActivateFn = (route, state) => {

  const router: Router = Inject(Router);
  const token = localStorage.getItem('token');
  const tokenRol = localStorage.getItem('token_rol');

  if (token && tokenRol && (tokenRol.includes('Bibliotecario') || tokenRol.includes('Admin'))) {
    return true;
  } else {
    router.navigateByUrl('login')
    return false;
  }
};
