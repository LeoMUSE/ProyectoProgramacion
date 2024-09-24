import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoItemComponent } from './catalogo-item.component';

describe('CatalogoItemComponent', () => {
  let component: CatalogoItemComponent;
  let fixture: ComponentFixture<CatalogoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogoItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
