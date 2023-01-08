import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisStatusComponent } from './regis-status.component';

describe('RegisStatusComponent', () => {
  let component: RegisStatusComponent;
  let fixture: ComponentFixture<RegisStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
