import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogEditorComponent } from './log-editor.component';

describe('LogEditorComponent', () => {
  let component: LogEditorComponent;
  let fixture: ComponentFixture<LogEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
