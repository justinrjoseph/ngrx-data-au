import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from './models';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: User): Observable<User> {
    const { email, password } = user;

    return this.http.post<User>('/api/login', { email, password });
  }
}
