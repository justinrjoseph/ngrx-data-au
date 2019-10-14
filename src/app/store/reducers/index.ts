import { environment } from '../../../environments/environment';

import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { AppState } from '../state';
import { authReducer } from '../../auth/store/reducers';

import { logger } from '../meta-reducers';

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducer
};

export const metaReducers: MetaReducer<AppState>[] =
  environment.production ? [] : [];
