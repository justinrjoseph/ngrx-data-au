import { createAction, props } from '@ngrx/store';

import { User } from '../../models';

export const login = createAction(
  '[Login Screen] User Login',
  props<{ user: User }>()
);

export const logout = createAction(
  '[Slide Menu] User Logout'
);
