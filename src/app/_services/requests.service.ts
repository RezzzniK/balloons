import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../_models/user.model';

@Injectable({ providedIn: 'root' })
export class RequestsService {
  private user: User;
  //messages = this.http.get<any[]>('http://localhost:4201');
  // private storageInit = false; //private user: User;
  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    this.user = user;
    console.log('login service');
    //console.log(this.user.password);
    //console.log(`user info name ${user.username}  pass:${user.password}`);
    return this.http.post<User>(`${environment.Base_URL}/login`, user);
    // return this.http.post<User>('http://localhost:4201/login', user);
    //http://localhost:4201
  }
}
