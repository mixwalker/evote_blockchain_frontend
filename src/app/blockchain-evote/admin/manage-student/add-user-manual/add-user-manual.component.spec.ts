import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserManualComponent } from './add-user-manual.component';

describe('AddUserManualComponent', () => {
  let component: AddUserManualComponent;
  let fixture: ComponentFixture<AddUserManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserManualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
