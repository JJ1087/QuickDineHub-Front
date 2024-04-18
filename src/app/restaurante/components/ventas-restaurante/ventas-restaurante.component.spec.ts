import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasRestauranteComponent } from './ventas-restaurante.component';

describe('VentasRestauranteComponent', () => {
  let component: VentasRestauranteComponent;
  let fixture: ComponentFixture<VentasRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VentasRestauranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentasRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
