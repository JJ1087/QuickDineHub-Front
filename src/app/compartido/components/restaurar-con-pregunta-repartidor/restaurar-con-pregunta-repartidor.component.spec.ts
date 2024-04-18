import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurarConPreguntaRepartidorComponent } from './restaurar-con-pregunta-repartidor.component';

describe('RestaurarConPreguntaRepartidorComponent', () => {
  let component: RestaurarConPreguntaRepartidorComponent;
  let fixture: ComponentFixture<RestaurarConPreguntaRepartidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurarConPreguntaRepartidorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurarConPreguntaRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
