import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationDetailButtonsComponent } from './consultation-detail-buttons.component';

describe('ConsultationDetailButtonsComponent', () => {
  let component: ConsultationDetailButtonsComponent;
  let fixture: ComponentFixture<ConsultationDetailButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationDetailButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationDetailButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
