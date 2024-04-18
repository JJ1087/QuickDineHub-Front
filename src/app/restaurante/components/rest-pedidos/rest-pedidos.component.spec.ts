import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestPedidosComponent } from './rest-pedidos.component';

describe('RestPedidosComponent', () => {
  let component: RestPedidosComponent;
  let fixture: ComponentFixture<RestPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestPedidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
