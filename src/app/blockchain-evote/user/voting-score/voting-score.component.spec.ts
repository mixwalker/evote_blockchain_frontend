import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingScoreComponent } from './voting-score.component';

describe('VotingScoreComponent', () => {
  let component: VotingScoreComponent;
  let fixture: ComponentFixture<VotingScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
