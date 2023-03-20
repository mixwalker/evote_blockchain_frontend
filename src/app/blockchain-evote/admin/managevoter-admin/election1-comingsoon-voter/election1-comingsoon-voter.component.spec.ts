import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Election1ComingsoonVoterComponent } from './election1-comingsoon-voter.component';

describe('Election1ComingsoonVoterComponent', () => {
  let component: Election1ComingsoonVoterComponent;
  let fixture: ComponentFixture<Election1ComingsoonVoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Election1ComingsoonVoterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Election1ComingsoonVoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
