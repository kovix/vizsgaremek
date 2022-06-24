import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationCreateDialogComponent } from './consultation-create-dialog.component';

describe('ConsultationCreateDialogComponent', () => {
  let component: ConsultationCreateDialogComponent;
  let fixture: ComponentFixture<ConsultationCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
