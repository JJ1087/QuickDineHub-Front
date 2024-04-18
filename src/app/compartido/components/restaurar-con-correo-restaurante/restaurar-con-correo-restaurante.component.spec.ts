import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurarConCorreoRestauranteComponent } from './restaurar-con-correo-restaurante.component';

describe('RestaurarConCorreoRestauranteComponent', () => {
  let component: RestaurarConCorreoRestauranteComponent;
  let fixture: ComponentFixture<RestaurarConCorreoRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurarConCorreoRestauranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurarConCorreoRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
