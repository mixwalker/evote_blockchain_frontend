import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionCompleteComponent } from './election-complete.component';

describe('ElectionCompleteComponent', () => {
  let component: ElectionCompleteComponent;
  let fixture: ComponentFixture<ElectionCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionCompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectionCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
