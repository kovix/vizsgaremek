import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationEditDetailsComponent } from './consultation-edit-details.component';

describe('ConsultationEditDetailsComponent', () => {
  let component: ConsultationEditDetailsComponent;
  let fixture: ComponentFixture<ConsultationEditDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationEditDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
