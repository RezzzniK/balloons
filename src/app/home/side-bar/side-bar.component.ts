import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  CallingForCreate,
  EditBalloon,
  getBalloons,
  getUserId,
} from './state/balloons.actions';
import { Balloons } from 'src/app/_models/balloon.model';
import { QuestionService } from 'src/app/dynamic-forms/question.service';
import { QuestionBase } from 'src/app/dynamic-forms/question-base';
import { SideBarDialogComponent } from './side-bar-dialog/side-bar-dialog.component';
import { FocusedOn } from './focus-state/focus-balloon.actions';

import * as balloonsSelector from '../side-bar/balloons.state';
import * as focusSelector from '../side-bar/focus-state/focus-balloons.state';
import * as userselector from '../../login/logInn.state';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  providers: [QuestionService],
})
export class SideBarComponent implements OnInit {
  userState = this.store.select(userselector.selectFeature);
  balloons_state$ = this.store.select(balloonsSelector.selectFeatureBalloons);
  focus$ = this.store.select(focusSelector.selectFocusFeature);
  balloons: Balloons[] = [];
  user_id: string;
  questions$: Observable<QuestionBase<any>[]>;
  editMode = false;
  getBalloonsClicked = false;
  constructor(
    private store: Store,
    service: QuestionService,
    public dialog: MatDialog
  ) {
    this.questions$ = service.getQuestions();
  }

  ngOnInit(): void {
    this.balloons_state$.subscribe((data) => {
      this.balloons = data.balloons;
    });
    this.userState.subscribe((id) => {
      this.user_id = id.userS._id;
    });
    this.store.dispatch(getUserId({ user_id: this.user_id }));
    //this.store.dispatch
  }
  GetBalloons() {
    this.balloons_state$.subscribe((data) => {
      this.user_id = data.user_id;
    });
    this.store.dispatch(getBalloons({ user_id: this.user_id }));
    this.getBalloonsClicked = true;
  }
  EditBalloon(balloon: Balloons): void {
    this.store.dispatch(EditBalloon({ balloon: balloon }));
    this.openDialog();
    console.log('Editting balloon with id: ' + balloon._id);
  }
  CreateBaloon(): void {
    this.store.dispatch(CallingForCreate());
    this.openDialog();
    console.log('Creating balloon');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SideBarDialogComponent, {
      width: '250px',
    });
  }
  focusOn(balloon: Balloons): void {
    this.store.dispatch(FocusedOn({ balloon: balloon }));
    console.log('focused on baloon with id: ' + balloon._id);
  }
}
