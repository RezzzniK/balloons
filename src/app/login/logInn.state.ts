import { createSelector, createFeatureSelector } from '@ngrx/store';

import { loginState } from './state/login.reducer';
import * as fromLoginReducer from './state/login.reducer';

export const selectFeature = createFeatureSelector<loginState>(
  fromLoginReducer.loginFeatureKey
);

export const selectFeatureUser = createSelector(
  selectFeature,
  (state) => state.userS
);
