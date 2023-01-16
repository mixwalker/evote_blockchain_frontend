import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatelistAdminComponent } from './candidatelist-admin.component';

describe('CandidatelistAdminComponent', () => {
  let component: CandidatelistAdminComponent;
  let fixture: ComponentFixture<CandidatelistAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatelistAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatelistAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
