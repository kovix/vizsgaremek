import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationDialogComponent } from './examination-dialog.component';

describe('ExaminationDialogComponent', () => {
  let component: ExaminationDialogComponent;
  let fixture: ComponentFixture<ExaminationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExaminationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
