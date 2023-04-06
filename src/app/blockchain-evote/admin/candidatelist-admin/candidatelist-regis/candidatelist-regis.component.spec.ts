import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatelistRegisComponent } from './candidatelist-regis.component';

describe('CandidatelistRegisComponent', () => {
  let component: CandidatelistRegisComponent;
  let fixture: ComponentFixture<CandidatelistRegisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatelistRegisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatelistRegisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
