import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconNavbarSidenavComponent } from './icon-navbar-sidenav.component';

describe('IconNavbarSidenavComponent', () => {
  let component: IconNavbarSidenavComponent;
  let fixture: ComponentFixture<IconNavbarSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconNavbarSidenavComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconNavbarSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
