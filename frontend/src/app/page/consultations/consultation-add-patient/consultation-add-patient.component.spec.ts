import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationAddPatientComponent } from './consultation-add-patient.component';

describe('ConsultationAddPatientComponent', () => {
  let component: ConsultationAddPatientComponent;
  let fixture: ComponentFixture<ConsultationAddPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationAddPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationAddPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
