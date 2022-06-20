import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationGroupDialogComponent } from './examination-group-dialog.component';

describe('ExaminationGroupDialogComponent', () => {
  let component: ExaminationGroupDialogComponent;
  let fixture: ComponentFixture<ExaminationGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExaminationGroupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
