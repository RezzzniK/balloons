import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Balloons } from '../_models/balloon.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BalloonsService {
  private balloons: Balloons[] = [];
  constructor(private http: HttpClient) {}

  getBaloons(user_id: string): Observable<any> {
    console.log('balloons service user id===>' + user_id);
    return this.http.post<Balloons[]>(`${environment.Base_URL}/balloons`, {
      user_id,
    });
  }
  createBaloon(balloon: Balloons): Observable<any> {
    console.log('balloons service create balloon===>');
    return this.http.post<Balloons[]>(
      `${environment.Base_URL}/balloons/create`,
      {
        balloon,
      }
    );
  }
  editBalloon(balloon: Balloons): Observable<any> {
    console.log('balloons service edit balloon===>');
    console.log(balloon);
    return this.http.put<Balloons[]>(`${environment.Base_URL}/balloons/edit`, {
      balloon,
    });
  }
}
