import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

export class LoginInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req);
    //.pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     let errorMsg = '';
    //     if (error.error instanceof ErrorEvent) {
    //       errorMsg = `Error: ${error.error.message}`;
    //       this.toastr.error(errorMsg);
    //       console.log(errorMsg);
    //     } else {
    //       this.toastr.error('this is server side error');
    //       console.log('this is server side error');
    //       errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
    //       console.log(errorMsg);
    //     }
    //     return throwError(errorMsg);
    //   })

    // if (environment.IS_MOCK) {
    //   console.log('Login request');
    //   console.log(new HttpResponse(testDB[req.url]));
    //   return of(new HttpResponse(testDB[req.url]));
    //   //return of(new HttpResponse(req.body));
    // } else {
    // console.log(req.url);
    // console.log(req.headers);
    // console.log(req.body);
  }
}
