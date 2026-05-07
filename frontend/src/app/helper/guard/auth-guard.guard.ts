import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthServiceService as Auth}  from '../../service/auth/auth-service.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if(!authService.isLoggedIn()){
    return router.createUrlTree(['/auth/login'], { queryParams: {returnUrl: state.url}});
  }
  return true;

};
