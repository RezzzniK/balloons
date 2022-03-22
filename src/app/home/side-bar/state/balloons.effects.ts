import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs/operators';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

import {
  CallingForCreate,
  CreateNewBalloon,
  EditBalloon,
  getBalloons,
  getUserId,
  RemoveBaloons,
  SavingAfterEdit,
  SendingUpdateToBalloon,
  showBalloons,
} from '../state/balloons.actions';
import { BalloonsService } from '../../../_services/balloons.service';
import { QuestionService } from 'src/app/dynamic-forms/question.service';

@Injectable()
export class BalloonsEffects {
  getUserId$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getUserId),
        tap((action) => {
          console.log('in edit effect');
          //return SavingAfterEdit({ balloon: action.balloon });
        })
      ),
    { dispatch: false }
  );

  balloons$ = createEffect(() =>
    this.actions$.pipe(
      // Filters by Action Creator 'login'
      ofType(getBalloons),
      exhaustMap((action) =>
        this.getBalloonsReq.getBaloons(action.user_id).pipe(
          map((data) => {
            console.log('in GetBalloons Effects');
            console.log(data.body);
            data.body.forEach((element) => {
              console.log(element.name);
            });
            // RemoveBaloons();
            return showBalloons({ balloons: data.body });
          })
        )
      )
    )
  );
  showBalloons$ = createEffect(
    () =>
      this.actions$.pipe(
        // Filters by Action Creator 'login'
        ofType(showBalloons),
        //withLatestFrom(this.store.select('logInSelector')),
        tap((action) => {
          console.log('in show baloons effect');
          return this.router.navigate(['/home/']);
        })
      ),
    { dispatch: false }
  );
  editBalloon$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EditBalloon)
        // tap((action) => {
        //   SavingAfterEdit({ balloon: action.balloon });
        // })
      ),
    { dispatch: false }
  );
  saveBalloon$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SavingAfterEdit)
        // exhaustMap(
        //   (action) =>
        //     this.getBalloonsReq.editBalloon(action.balloon)
        //     //action.balloon, action._id
        //   //.pipe(
        //   //   map((data) => {
        //   //     console.log('in EditBalloons Effects');
        //   //     console.log(data.body);
        //   //     return { balloon: data.body };
        //   //   })
        //   // )
        // )
      ),
    { dispatch: false }
  );
  sendBalloon$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SendingUpdateToBalloon),
        exhaustMap(
          (action) =>
            this.getBalloonsReq.editBalloon(action.updatedBalloon)

          //action.balloon, action._id
          //.pipe(
          //   map((data) => {
          //     console.log('in EditBalloons Effects');
          //     console.log(data.body);
          //     return { balloon: data.body };
          //   })
          // )
        )
      ),
    { dispatch: false }
  );

  //       tap((action)=>{
  //         SavingAfterEdit(action.balloon)
  //       })
  //       // exhaustMap((action) =>
  //       //   this.getBalloonsReq.editBalloon(action.balloon).pipe(
  //       //     map((data) => {
  //       //       console.log('in EditBalloons Effects');
  //       //       console.log(data.body);
  //       //       return { balloons: data.body };
  //       //     })
  //       //   )
  //       )
  //     ),
  //   { dispatch: false }
  // );

  //   ofType(LoginInProcess),
  //   exhaustMap((action) =>
  //     this.request.login(action.user).pipe(
  //       map((data) => {
  //         console.log('in LoginProcess Effects');
  //         console.log(data.body);
  //         return LoginSuccess({ user: data.body });
  //       }),
  //       catchError(() => of(LoginFailed()))
  //     )
  //   )
  // )
  // );

  // editBalloon$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(EditBalloon),
  //       exhaustMap((action) =>
  //         this.getBalloonsReq.editBalloon(action.balloon).pipe(
  //           map((data) => {
  //             console.log('in EditBalloons Effects');
  //             console.log(data.body);
  //             return { balloons: data.body };
  //           })
  //         )
  //       )
  //     ),
  //   { dispatch: false }
  // );

  CreateBalloon$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CallingForCreate),
        tap(() => {
          console.log('in Create Baloon effect');

          //return this.router.navigate(['/home/']);
        })
      ),
    { dispatch: false }
  );

  addBalloon$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CreateNewBalloon),
        exhaustMap((action) =>
          this.getBalloonsReq.createBaloon(action.balloon).pipe(
            map((data) => {
              console.log('in add balloon Effects');
              console.log(data.body);

              return { balloons: data.body };
            })
          )
        )
        //createBaloon
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private getBalloonsReq: BalloonsService,
    private router: Router,
    private questionService: QuestionService
  ) {}
}
