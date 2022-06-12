import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseListTheadComponent } from './base-list-thead.component';

describe('BaseListTheadComponent', () => {
  let component: BaseListTheadComponent;
  let fixture: ComponentFixture<BaseListTheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseListTheadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseListTheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
