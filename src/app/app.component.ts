import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent
} from '@angular/router';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from './store/state';

import * as authSelectors from './auth/store/selectors';
import { logout } from './auth/store/actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = true;

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private router: Router, private _store: Store<AppState>) {}

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      switch ( true ) {
        case event instanceof NavigationStart:
          this.loading = true;
          break;
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError:
          this.loading = false;
          break;
        default:
          break;
      }
    });

    this.isLoggedIn$ = this._store.select(authSelectors.isLoggedIn);

    this.isLoggedOut$ = this._store.select(authSelectors.isLoggedOut);
  }

  logout() {
    this._store.dispatch(logout());

    this.router.navigate(['/']);
  }
}
