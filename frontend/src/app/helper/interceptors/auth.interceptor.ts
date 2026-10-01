import { inject } from '@angular/core'
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthServiceService } from '../../service/auth/auth-service.service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthServiceService);
  const token = authService.getToken();


  if (token) {
    console.log('Sending request to:', req.url, 'with token:', token);
    const authorisedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    return next(authorisedRequest);
  }

  console.log('Sending request to:', req.url, 'without Token');
  return next(req)
}
