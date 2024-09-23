import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearResenaComponent } from './crear-resena.component';

describe('CrearResenaComponent', () => {
  let component: CrearResenaComponent;
  let fixture: ComponentFixture<CrearResenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearResenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearResenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
