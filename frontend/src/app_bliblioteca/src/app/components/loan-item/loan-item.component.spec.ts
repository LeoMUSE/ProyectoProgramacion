import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanItemComponent } from './loan-item.component';

describe('LoanItemComponent', () => {
  let component: LoanItemComponent;
  let fixture: ComponentFixture<LoanItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
