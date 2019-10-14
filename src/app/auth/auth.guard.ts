import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthState } from './store/state';
import { isLoggedIn } from './store/selectors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _store: Store<AuthState>, private _router: Router) {}

  canActivate(): Observable<boolean> {
    return this._store.select(isLoggedIn)
      .pipe(
        tap((loggedIn: boolean) => {
          const loggedOut = !loggedIn;

          if ( loggedOut ) this._router.navigate(['/login']);
        })
      );
  }
}
