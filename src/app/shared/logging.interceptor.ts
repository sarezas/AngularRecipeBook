import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggingInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // pipe(tap()) gives us access to any data on an observable, without consuming that observable
        // that's why I do not use .subscribe()
        return next.handle(req).pipe(tap(
            event => {
                console.log('Logging interceptor', event);
            }
        ));
    }
}
