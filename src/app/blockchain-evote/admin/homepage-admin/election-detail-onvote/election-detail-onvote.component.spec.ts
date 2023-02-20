import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionDetailOnvoteComponent } from './election-detail-onvote.component';

describe('ElectionDetailOnvoteComponent', () => {
  let component: ElectionDetailOnvoteComponent;
  let fixture: ComponentFixture<ElectionDetailOnvoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionDetailOnvoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectionDetailOnvoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
