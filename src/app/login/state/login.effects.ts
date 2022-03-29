import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import {
  CreateUser,
  LoginFailed,
  LoginInProcess,
  LoginSuccess,
  LogOut,
} from '../state/login.actions';
import { RequestsService } from '../../_services/requests.service';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      // Filters by Action Creator 'login'
      ofType(LoginInProcess),
      exhaustMap((action) =>
        this.request.login(action.user).pipe(
          map((data) => {
            console.log('in LoginProcess Effects');

            return LoginSuccess({ user: data.body });
          }),
          catchError(() => of(LoginFailed()))
        )
      )
    )
  );
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        // Filters by Action Creator 'login'
        ofType(LoginSuccess),
        //withLatestFrom(this.store.select('logInSelector')),
        tap(() => {
          console.log('in success effect');
          return this.router.navigate(['/home/']);
        })
      ),
    { dispatch: false }
  );
  logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LogOut),
        tap(() => {
          console.log('in logout effect');
          return this.router.navigate(['../']);
        })
      ),
    { dispatch: false }
  );
  createUser$ = createEffect(
    () =>
      this.actions$.pipe(
        // Filters by Action Creator 'login'
        ofType(CreateUser),
        exhaustMap((action) =>
          this.request.createUser(action.user).pipe(
            tap(() => {
              console.log('in create=> Effects');

              this.router.navigate(['..']);
            })
          )
        )
      ),
    { dispatch: false }
  );
  constructor(
    /*@Inject(Actions) */ private actions$: Actions,
    private request: RequestsService,
    private router: Router // private store: Store<LoginState>
  ) {}
}
