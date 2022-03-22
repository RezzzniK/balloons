import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { FocusedOn } from './focus-balloon.actions';

@Injectable()
export class FocusEffects {
  focus$ = createEffect(
    () =>
      this.actions$.pipe(
        // Filters by Action Creator 'login'
        ofType(FocusedOn),
        tap((action) => {
          console.log('in focused on effect');
        })
      ),
    { dispatch: false }
  );
  constructor(private actions$: Actions) {}
}
