import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegMemconcilComponent } from './reg-memconcil.component';

describe('RegMemconcilComponent', () => {
  let component: RegMemconcilComponent;
  let fixture: ComponentFixture<RegMemconcilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegMemconcilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegMemconcilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
