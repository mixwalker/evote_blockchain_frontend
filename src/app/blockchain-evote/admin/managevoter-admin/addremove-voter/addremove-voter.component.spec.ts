import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddremoveVoterComponent } from './addremove-voter.component';

describe('AddremoveVoterComponent', () => {
  let component: AddremoveVoterComponent;
  let fixture: ComponentFixture<AddremoveVoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddremoveVoterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddremoveVoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
