import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateElectionAdminComponent } from './create-election-admin.component';

describe('CreateElectionAdminComponent', () => {
  let component: CreateElectionAdminComponent;
  let fixture: ComponentFixture<CreateElectionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateElectionAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateElectionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
