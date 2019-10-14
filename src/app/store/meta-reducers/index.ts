import { ActionReducer } from '@ngrx/store';

import { AppState } from '../state';

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    console.log(`state before: ${state}`);
    console.log(`action: ${action}`);

    return reducer(state, action);
  };
}
