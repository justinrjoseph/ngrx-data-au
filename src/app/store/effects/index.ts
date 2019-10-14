import { Injectable } from '@angular/core';

import { OnInitEffects } from '@ngrx/effects';

import { login, logout } from '../../auth/store/actions';

@Injectable()
export class RootEffects implements OnInitEffects {
  ngrxOnInitEffects() {
    const user = JSON.parse(localStorage.getItem('user'));

    if ( user ) return login({ user });
    else return logout();
  }
}
