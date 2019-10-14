import { RouterReducerState } from '@ngrx/router-store';
import { AuthState } from '../../auth/store/state';

export interface AppState {
  router: RouterReducerState;
  auth: AuthState;
}
