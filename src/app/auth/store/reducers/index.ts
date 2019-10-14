import { createReducer, on } from '@ngrx/store';

import { INITIAL_AUTH_STATE } from '../state';
import { login, logout } from '../actions';

export const authReducer = createReducer(
  INITIAL_AUTH_STATE,
  on(login, (state, action) => {
    return { user: action.user };
  }),
  on(logout, () => {
    return { user: null };
  })
);
