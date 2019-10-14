import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from '../models';

interface CoursesPayload {
  payload: Course[];
}

@Injectable()
export class CourseDataService extends DefaultDataService<Course> {
  constructor(http: HttpClient, urlGenerator: HttpUrlGenerator) {
    super('Course', http, urlGenerator);
  }

  getAll(): Observable<Course[]> {
    return this.http.get<CoursesPayload>('/api/courses')
      .pipe(
        map((response: CoursesPayload) => response.payload)
      );
  }
}
