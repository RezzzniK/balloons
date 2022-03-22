import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromFocusBaloonReducer from './focus-balloon.reducer';

export const selectFocusFeature =
  createFeatureSelector<fromFocusBaloonReducer.focusState>(
    fromFocusBaloonReducer.focusFeatureKey
  );
export const selectFocusOnBalloon = createSelector(
  selectFocusFeature,
  (state) => state.focusOn
);
