import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColumnSelectorComponent } from './list-column-selector.component';

describe('ListColumnSelectorComponentComponent', () => {
  let component: ListColumnSelectorComponent;
  let fixture: ComponentFixture<ListColumnSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListColumnSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListColumnSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
