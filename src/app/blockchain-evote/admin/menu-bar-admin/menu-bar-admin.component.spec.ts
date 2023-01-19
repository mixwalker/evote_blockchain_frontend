import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBarAdminComponent } from './menu-bar-admin.component';

describe('MenuBarAdminComponent', () => {
  let component: MenuBarAdminComponent;
  let fixture: ComponentFixture<MenuBarAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBarAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
