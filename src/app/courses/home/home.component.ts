import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { MatDialog } from '@angular/material';

import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CourseEntityService } from '../services';

import { Course } from '../models';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private _courseService: CourseEntityService
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.promoTotal$ = this._courseService.entities$
      .pipe(
        map((courses: Course[]) => {
          return courses.filter((course) => course.promo).length;
        })
      );

    this.beginnerCourses$ = this._courseService.entities$
      .pipe(
        map((courses: Course[]) => {
          return courses.filter((course) => course.category === 'BEGINNER');
        })
      );

    this.advancedCourses$ = this._courseService.entities$
      .pipe(
        map((courses: Course[]) => {
          return courses.filter((course) => course.category === 'ADVANCED');
        })
      );
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
