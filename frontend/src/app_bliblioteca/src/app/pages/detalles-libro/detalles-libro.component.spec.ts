import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesLibroComponent } from './detalles-libro.component';

describe('DetallesLibroComponent', () => {
  let component: DetallesLibroComponent;
  let fixture: ComponentFixture<DetallesLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallesLibroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
