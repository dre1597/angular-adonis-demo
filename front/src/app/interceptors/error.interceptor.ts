import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

export class ErrorIntercept implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = JSON.stringify({ error: error.error.message });
        } else {
          // server-side error
          if (error.status === HttpStatusCode.UnprocessableEntity) {
            if (error?.error?.errors) {
              const errors = error.error.errors;
              errorMessage = errors
                .map((error: any) => error.message)
                .join('\n');
            }
          } else {
            errorMessage = JSON.stringify({
              error: error.error.message,
              status: error.status,
            });
          }
        }
        return throwError(() => errorMessage);
      }),
    );
  }
}
