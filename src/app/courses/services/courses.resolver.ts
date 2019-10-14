import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { CourseEntityService } from './course-entity.service';

import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  constructor(private _service: CourseEntityService) {}

  resolve(): Observable<boolean> {
    return this._service.loaded$
      .pipe(
        tap((loaded: boolean) => {
          // HTTP call to /api/courses
          if ( !loaded ) this._service.getAll();
        }),
        // prevents route transition with false value
        // waits for data to be loaded
        filter((loaded) => loaded),
        // ensures observable completes and transition goes through
        first()
      );
  }
}
