import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { Balloons } from '../_models/balloon.model';

@Injectable()
export class QuestionService {
  getQuestions() {
    const questions: QuestionBase<string>[] = [
      new DropdownQuestion({
        key: 'type',
        label: 'Type',
        options: [
          { key: '300', value: 'small' },
          { key: '1000', value: 'medium' },
          { key: '2000', value: 'big' },
          { key: '4000', value: 'double' },
        ],
        required: true,
        order: 3,
      }),
      new DropdownQuestion({
        key: 'color',
        label: 'Color',
        options: [
          { key: 'BLACK', value: 'black' },
          { key: 'WHITE', value: 'white' },
          { key: 'RED', value: 'red' },
          { key: 'BLUE', value: 'blue' },
        ],
        required: true,
        order: 4,
      }),

      new TextboxQuestion({
        key: 'name',
        label: 'Balloon Name',
        value: '',
        required: true,
        order: 1,
      }),

      new TextboxQuestion({
        key: 'description',
        label: 'Description',
        value: '',
        required: true,
        order: 2,
      }),
      new TextboxQuestion({
        key: 'longitude',
        label: 'Longitude',
        required: false,
        type: 'number',
        order: 5,
      }),
      new TextboxQuestion({
        key: 'latitude',
        label: 'Latitude',
        required: false,
        type: 'number',
        order: 6,
      }),
      new TextboxQuestion({
        key: 'altitude',
        label: 'Altitude',
        required: false,
        type: 'number',
        order: 7,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  editBalloon(balloon: Balloons) {
    const questions: QuestionBase<string>[] = [
      new DropdownQuestion({
        key: 'type',
        label: 'Type',
        options: [
          { key: '300', value: 'small' },
          { key: '1000', value: 'medium' },
          { key: '2000', value: 'big' },
          { key: '4000', value: 'double' },
        ],
        required: true,
        order: 3,
        value: balloon.type,
      }),
      new DropdownQuestion({
        key: 'color',
        label: 'Color',
        options: [
          { key: 'BLACK', value: 'black' },
          { key: 'WHITE', value: 'white' },
          { key: 'RED', value: 'red' },
          { key: 'BLUE', value: 'blue' },
        ],
        required: true,
        order: 4,
        value: balloon.color,
      }),

      new TextboxQuestion({
        key: 'name',
        label: 'Balloon Name',
        value: balloon.name,
        required: true,
        order: 1,
      }),

      new TextboxQuestion({
        key: 'description',
        label: 'Description',
        value: balloon.description,
        required: true,
        order: 2,
      }),
      new TextboxQuestion({
        key: 'longitude',
        label: 'Longitude',
        required: false,
        type: 'number',
        order: 5,
        value: balloon.longitude,
      }),
      new TextboxQuestion({
        key: 'latitude',
        label: 'Latitude',
        required: false,
        type: 'number',
        order: 6,
        value: balloon.latitude,
      }),
      new TextboxQuestion({
        key: 'altitude',
        label: 'Altitude',
        required: false,
        type: 'number',
        order: 7,
        value: balloon.altitude,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
