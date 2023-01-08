import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockchainEvoteComponent } from './blockchain-evote.component';

describe('BlockchainEvoteComponent', () => {
  let component: BlockchainEvoteComponent;
  let fixture: ComponentFixture<BlockchainEvoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockchainEvoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockchainEvoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
