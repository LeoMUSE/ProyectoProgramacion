import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBookCardComponent } from './home-book-card.component';

describe('BookCardComponent', () => {
  let component: HomeBookCardComponent;
  let fixture: ComponentFixture<HomeBookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeBookCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
