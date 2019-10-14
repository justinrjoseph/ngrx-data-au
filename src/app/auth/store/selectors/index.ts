import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '../state';

export const authState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(
  authState,
  (state: AuthState) => !!state.user
);
export const isLoggedOut = createSelector(
  isLoggedIn,
  (loggedIn: boolean) => !loggedIn
);
