import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationGroupMembersComponent } from './examination-group-members.component';

describe('ExaminationGroupMembersComponent', () => {
  let component: ExaminationGroupMembersComponent;
  let fixture: ComponentFixture<ExaminationGroupMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExaminationGroupMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationGroupMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
