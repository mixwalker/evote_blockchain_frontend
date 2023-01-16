import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagevoterAdminComponent } from './managevoter-admin.component';

describe('ManagevoterAdminComponent', () => {
  let component: ManagevoterAdminComponent;
  let fixture: ComponentFixture<ManagevoterAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagevoterAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagevoterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
