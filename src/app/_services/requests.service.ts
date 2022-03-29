import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../_models/user.model';

@Injectable({ providedIn: 'root' })
export class RequestsService {
  private user: User;
  constructor(private http: HttpClient, private toastr: ToastrService) {}
  //LOGIN USER SERVICE
  login(user: User): Observable<any> {
    this.user = user;
    console.log('Login user service');
    try {
      return this.http.post<User>(
        `${environment.Base_URL}/login`,
        user
        //  {
        //   withCredentials: true,
        // }
      );
    } catch (error) {
      console.log(error.response.statusText);
      this.toastr.error();
      return null;
    }
  }
  //CREATE USER SERVICE
  createUser(user: User): Observable<any> {
    this.user = user;
    console.log('Create user service');
    return this.http.post<User>(`${environment.User_URL}/create`, user);
  }
}
