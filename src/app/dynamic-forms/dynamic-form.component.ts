import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SideBarDialogComponent } from '../home/side-bar/side-bar-dialog/side-bar-dialog.component';

import {
  CreateNewBalloon,
  getBalloons,
  SavingAfterEdit,
  SendingUpdateToBalloon,
  Sent,
} from '../home/side-bar/state/balloons.actions';
import { Balloons } from '../_models/balloon.model';
import * as balloonsSelector from '../home/side-bar/balloons.state';
import { QuestionBase } from './question-base';
import { QuestionControlService } from './question-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService],
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] | null = [];

  form!: FormGroup;
  balloon: Balloons;
  payLoad = '';
  state$ = this.store.select(balloonsSelector.selectFeatureBalloons);
  user_id: string;
  updated_balloon: Balloons;
  createMode: boolean;

  constructor(
    private qcs: QuestionControlService,
    private store: Store,
    public dialogRef: MatDialogRef<SideBarDialogComponent>
  ) {
    this.state$.subscribe((data) => {
      this.createMode = data.createMode;
    });
  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
    this.state$.subscribe((data) => {
      this.updated_balloon = data.updatedBalloon;
    });
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.balloon = this.form.value;
    if (this.createMode) {
      this.state$.subscribe((data) => {
        this.user_id = data.user_id;
      });
      this.balloon.user_id = this.user_id;
      this.store.dispatch(CreateNewBalloon({ balloon: this.balloon }));
      this.store.dispatch(getBalloons({ user_id: this.user_id }));
    } else {
      this.store.dispatch(SavingAfterEdit({ balloon: this.balloon }));
      this.store.dispatch(
        SendingUpdateToBalloon({ updatedBalloon: this.updated_balloon })
      );
      this.store.dispatch(Sent({ updatedBalloon: this.updated_balloon }));
    }
    this.dialogRef.close();
  }
  OnReset() {
    this.form.reset();
  }
}
