import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantesClienteComponent } from './restaurantes-cliente.component';

describe('RestaurantesClienteComponent', () => {
  let component: RestaurantesClienteComponent;
  let fixture: ComponentFixture<RestaurantesClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantesClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
