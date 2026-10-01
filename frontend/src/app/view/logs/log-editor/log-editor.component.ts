import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDialogContext, TuiLabel, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiRating, TuiSelect, TuiDataListWrapper, TuiTextarea } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import {Log, LogPostRequest} from '../../../data/models/log';


@Component({
  standalone: true,
  selector: 'app-log-editor',
  imports: [
    ReactiveFormsModule,
    TuiSelect,
    TuiTextarea,
    TuiTextfield,
    TuiButton,
    TuiLabel,
    TuiRating,
    TuiDataListWrapper
  ],
  templateUrl: './log-editor.component.html',
  styleUrl: './log-editor.component.scss'
})
export class LogEditorComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  readonly context = inject<TuiDialogContext<LogPostRequest, Log | null>>(
    POLYMORPHEUS_CONTEXT,
  );


  protected readonly isEditMode = !!this.context.data?.id;
  protected readonly difficultyOptions = Array.from({ length: 10 }, (_, i) => i + 1);


  logForm = this.fb.group({
    comment: ['', [Validators.required]],
    difficulty: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
    rating: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    locationId: [null as number | null],
  });



  ngOnInit(): void {
    if (this.context.data) {
      this.logForm.patchValue({
        comment: this.context.data.comment ?? '',
        difficulty: this.context.data.difficulty ?? 5,
        rating: this.context.data.rating ?? 3,
        locationId: this.context.data.location ?? null,
      });
    }
  }

  onSubmit(): void {
    if (this.logForm.valid) {
      const formValue = this.logForm.getRawValue();
      const payload: LogPostRequest = {
        comment: formValue.comment!,
        difficulty: Number(formValue.difficulty),
        rating: Number(formValue.rating)
      };
      this.context.completeWith(payload);
    }
  }

  onCancel(): void {
    this.context.$implicit.complete();
  }
}
