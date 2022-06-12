import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseListIconComponent } from './base-list-icon.component';

describe('BaseListIconComponent', () => {
  let component: BaseListIconComponent;
  let fixture: ComponentFixture<BaseListIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseListIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseListIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
