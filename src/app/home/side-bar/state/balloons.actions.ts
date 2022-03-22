import { createAction, props } from '@ngrx/store';

import { Balloons } from 'src/app/_models/balloon.model';

export const getUserId = createAction(
  'Getting user Id after login',
  props<{ user_id: string }>()
);
export const getBalloons = createAction(
  'Getting Balloons ....',
  props<{ user_id: string }>()
);
export const showBalloons = createAction(
  'Showing baloons',
  props<{ balloons: Balloons[] }>()
);

export const EditBalloon = createAction(
  'Edit baloon',
  props<{ balloon: Balloons }>()
);
export const SavingAfterEdit = createAction(
  'Saving after edit',
  props<{ balloon: Balloons }>()
);
// export const SendingUpdateToBalloon = createAction(
//   'Sending updated balloon',
//   props<{ updatedBalloon: Balloons }>()
// );
export const SendingUpdateToBalloon = createAction(
  'Sending updated balloon',
  props<{ updatedBalloon: Balloons }>()
);
export const Sent = createAction(
  'Balloon sent to BackEnd',
  props<{ updatedBalloon: Balloons }>()
);
export const CallingForCreate = createAction('calling for create action');
export const CreateNewBalloon = createAction(
  'Creating new Baloon',
  props<{ balloon: Balloons }>()
);
export const RemoveBaloons = createAction('Removing user baloons after logout');
