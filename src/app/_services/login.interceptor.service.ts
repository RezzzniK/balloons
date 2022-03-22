import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

export class LoginInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // if (environment.IS_MOCK) {
    //   console.log('Login request');
    //   console.log(new HttpResponse(testDB[req.url]));
    //   return of(new HttpResponse(testDB[req.url]));
    //   //return of(new HttpResponse(req.body));
    // } else {
    console.log(req.url);
    console.log(req.headers);
    console.log(req.body);
    return next.handle(req);
  }
}
