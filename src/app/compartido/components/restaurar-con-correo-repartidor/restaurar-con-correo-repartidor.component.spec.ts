import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurarConCorreoRepartidorComponent } from './restaurar-con-correo-repartidor.component';

describe('RestaurarConCorreoRepartidorComponent', () => {
  let component: RestaurarConCorreoRepartidorComponent;
  let fixture: ComponentFixture<RestaurarConCorreoRepartidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurarConCorreoRepartidorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurarConCorreoRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
