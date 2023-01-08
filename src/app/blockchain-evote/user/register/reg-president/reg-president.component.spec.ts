import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPresidentComponent } from './reg-president.component';

describe('RegPresidentComponent', () => {
  let component: RegPresidentComponent;
  let fixture: ComponentFixture<RegPresidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegPresidentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegPresidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
