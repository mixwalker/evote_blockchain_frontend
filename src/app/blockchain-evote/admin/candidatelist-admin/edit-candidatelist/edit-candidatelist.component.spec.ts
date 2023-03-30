import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCandidatelistComponent } from './edit-candidatelist.component';

describe('EditCandidatelistComponent', () => {
  let component: EditCandidatelistComponent;
  let fixture: ComponentFixture<EditCandidatelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCandidatelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
