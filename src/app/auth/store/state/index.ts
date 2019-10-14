import { User } from '../../models';

export interface AuthState {
  user: User;
}

export const INITIAL_AUTH_STATE: AuthState = {
  user: null
};
