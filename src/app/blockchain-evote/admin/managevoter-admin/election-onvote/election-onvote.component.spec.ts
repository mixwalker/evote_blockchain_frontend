import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionOnvoteComponent } from './election-onvote.component';

describe('ElectionOnvoteComponent', () => {
  let component: ElectionOnvoteComponent;
  let fixture: ComponentFixture<ElectionOnvoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionOnvoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectionOnvoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
