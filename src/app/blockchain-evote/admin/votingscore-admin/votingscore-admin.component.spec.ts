import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingscoreAdminComponent } from './votingscore-admin.component';

describe('VotingscoreAdminComponent', () => {
  let component: VotingscoreAdminComponent;
  let fixture: ComponentFixture<VotingscoreAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingscoreAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingscoreAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
