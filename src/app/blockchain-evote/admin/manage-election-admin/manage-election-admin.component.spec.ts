import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageElectionAdminComponent } from './manage-election-admin.component';

describe('ManageElectionAdminComponent', () => {
  let component: ManageElectionAdminComponent;
  let fixture: ComponentFixture<ManageElectionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageElectionAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageElectionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
