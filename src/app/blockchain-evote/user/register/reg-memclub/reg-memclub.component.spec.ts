import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegMemclubComponent } from './reg-memclub.component';

describe('RegMemclubComponent', () => {
  let component: RegMemclubComponent;
  let fixture: ComponentFixture<RegMemclubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegMemclubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegMemclubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
