import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { CourseEntityService } from '../services';

import { Course } from '../models';

@Component({
  selector: 'course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCourseDialogComponent {
  form: FormGroup;

  dialogTitle: string;

  course: Course;

  mode: 'create' | 'update';

  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private _courseService: CourseEntityService) {

        this.dialogTitle = data.dialogTitle;
        this.course = data.course;
        this.mode = data.mode;

        const formControls = {
            description: ['', Validators.required],
            category: ['', Validators.required],
            longDescription: ['', Validators.required],
            promo: ['', []]
        };

    if ( this.mode === 'update' ) {
      this.form = this.fb.group(formControls);

      this.form.patchValue({...data.course});
    } else if ( this.mode === 'create' ) {
      this.form = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required]
      });
    }
  }

  onSave() {
    const course: Course = {
      ...this.course,
      ...this.form.value
    };

    if ( this.mode === 'update' ) {
      this._courseService.update(course);

      this.dialogRef.close();

      return;
    }

    this._courseService.add(course)
      .subscribe(() => this.dialogRef.close());
  }
}
