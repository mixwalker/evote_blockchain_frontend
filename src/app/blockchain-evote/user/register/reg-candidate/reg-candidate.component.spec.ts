import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegCandidateComponent } from './reg-candidate.component';

describe('RegPresidentComponent', () => {
  let component: RegCandidateComponent;
  let fixture: ComponentFixture<RegCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
