import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  /// Get token? local-store?
  /// Inject a store-service?
  const token = localStorage.getItem("motp_auth_token");

  /// Should I analyze the rest of the request as well?
  /// Prob not necessary

  if (token) {
    const authorisedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    return next(authorisedRequest);
  }

  return next(req)
}
