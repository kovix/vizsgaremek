import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationGroupsComponent } from './examination-groups.component';

describe('ExaminationGroupsComponent', () => {
  let component: ExaminationGroupsComponent;
  let fixture: ComponentFixture<ExaminationGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExaminationGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
