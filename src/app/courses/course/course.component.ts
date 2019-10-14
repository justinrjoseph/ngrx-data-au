import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, tap, withLatestFrom, delay } from 'rxjs/operators';

import { CourseEntityService, LessonEntityService } from '../services';

import { Course, Lesson } from '../models';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {
  course$: Observable<Course>;

  lessons$: Observable<Lesson[]>;

  loading$: Observable<boolean>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  constructor(
    private route: ActivatedRoute,
    private _courseService: CourseEntityService,
    private _lessonService: LessonEntityService
  ) {}

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');

    this.course$ = this._courseService.entities$
      .pipe(
        map((courses: Course[]) => {
          return courses.find((course) => course.url === courseUrl);
        })
      );

    this.lessons$ = this._lessonService.entities$
      .pipe(
        withLatestFrom(this.course$),
        tap(([lessons, course]) => {
          if ( !this.nextPage ) this.loadLessonsPage(course);
        }),
        map(([lessons, course]) => {
          return lessons.filter((lesson) => lesson.courseId === course.id);
        })
      );

    this.loading$ = this._lessonService.loading$.pipe(delay(0));
  }

  loadLessonsPage(course: Course) {
    const courseId = course.id.toString(),
          pageNumber = this.nextPage.toString(),
          pageSize = '3';

    this._lessonService.getWithQuery({ courseId, pageNumber, pageSize });

    this.nextPage += 1;
  }
}
