import { createAction, props } from '@ngrx/store';

import { Balloons } from 'src/app/_models/balloon.model';

export const FocusedOn = createAction(
  'Focus on Balloon',
  props<{ balloon: Balloons }>()
);

// export const FocusEdit = createAction(
//   'Edit After Focus on Balloon',
//   props<{ balloon: Balloons }>()
// );
