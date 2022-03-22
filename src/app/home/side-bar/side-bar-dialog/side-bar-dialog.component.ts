import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { QuestionBase } from 'src/app/dynamic-forms/question-base';
import { QuestionControlService } from 'src/app/dynamic-forms/question-control.service';
import { QuestionService } from 'src/app/dynamic-forms/question.service';
import * as balloonsSelector from '../../side-bar/balloons.state';
import { Balloons } from 'src/app/_models/balloon.model';

@Component({
  selector: 'app-side-bar-dialog',
  templateUrl: './side-bar-dialog.component.html',
  providers: [QuestionService, QuestionControlService],
})
export class SideBarDialogComponent implements OnInit {
  questions$: Observable<QuestionBase<any>[]>;
  state$ = this.store.select(balloonsSelector.selectFeatureBalloons);
  baloon2Edit: Balloons = null;
  editMode: boolean;
  dialogLabel: string;
  constructor(
    public dialogRef: MatDialogRef<SideBarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Balloons,
    private questionService: QuestionService,
    private store: Store
  ) {
    this.state$.subscribe((data) => {
      (this.baloon2Edit = data.balloonToEdit), (this.editMode = data.editMode);
    });
    if (this.editMode) {
      console.log(this.editMode);
      this.dialogLabel = 'Edit Balloon';
      this.questions$ = questionService.editBalloon(this.baloon2Edit);
    } else {
      this.dialogLabel = 'Create Balloon';

      this.questions$ = questionService.getQuestions();
    }
  }
  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
