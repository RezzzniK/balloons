import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromBalloonsReducer from '../side-bar/state/balloons.reducer';

export const selectBFeature =
  createFeatureSelector<fromBalloonsReducer.balloonState>(
    fromBalloonsReducer.baloonsFeatureKey
  );

export const selectFeatureBalloons = createSelector(
  selectBFeature,
  (state) => state
);

// export const selectFocusOnBalloon = createSelector(
//   selectBFeature,
//   (state) => state.focusOn
// );
