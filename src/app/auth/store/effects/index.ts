import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, ofType, createEffect, ROOT_EFFECTS_INIT } from '@ngrx/effects';

import { login, logout } from '../actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(login),
      tap((action) => {
        localStorage.setItem('user', JSON.stringify(action.user));
      })
    );
  }, { dispatch: false });

  logout$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(logout),
      tap(() => {
        localStorage.removeItem('user');

        this._router.navigate(['/login']);
      })
    );
  }, { dispatch: false });

  constructor(private _actions$: Actions, private _router: Router) {}
}
