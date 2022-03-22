import { createReducer, on } from '@ngrx/store';

import { Balloons } from 'src/app/_models/balloon.model';
import { FocusedOn } from './focus-balloon.actions';

export interface focusState {
  focusOn: Balloons;
  focusClicked: boolean;
}
export const focusFeatureKey = 'focus';
export const initialFocusState: focusState = {
  //initial state of app before any actions to be dispatched
  focusOn: undefined,
  focusClicked: false,
};
export const focusReducer = createReducer(
  initialFocusState,

  on(FocusedOn, (state, action) => ({
    ...state,
    focusOn: action.balloon,
    focusClicked: true,
  }))
);
