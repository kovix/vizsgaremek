import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExaminationToGroupComponent } from './add-examination-to-group.component';

describe('AddExaminationToGroupComponent', () => {
  let component: AddExaminationToGroupComponent;
  let fixture: ComponentFixture<AddExaminationToGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExaminationToGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExaminationToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
