import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmModalComponent } from './abm-modal.component';

describe('AbmModalComponent', () => {
  let component: AbmModalComponent;
  let fixture: ComponentFixture<AbmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbmModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
