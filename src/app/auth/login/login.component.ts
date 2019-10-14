import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/state';
import { login } from '../store/actions';

import { AuthService } from '../auth.service';

import { User } from '../models';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private _store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });
  }

  login() {
    const credentials = this.form.value;

    this.auth.login(credentials)
      .subscribe(
        (user: User) => {
          this._store.dispatch(login({ user }));

          this.router.navigate(['/courses']);
        },
        () => alert('Login failed')
      );
  }
}

