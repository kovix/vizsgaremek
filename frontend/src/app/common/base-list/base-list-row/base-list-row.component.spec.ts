import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseListRowComponent } from './base-list-row.component';

describe('BaseListRowComponent', () => {
  let component: BaseListRowComponent;
  let fixture: ComponentFixture<BaseListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseListRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
