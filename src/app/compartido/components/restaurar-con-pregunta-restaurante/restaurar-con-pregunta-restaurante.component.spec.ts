import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurarConPreguntaRestauranteComponent } from './restaurar-con-pregunta-restaurante.component';

describe('RestaurarConPreguntaRestauranteComponent', () => {
  let component: RestaurarConPreguntaRestauranteComponent;
  let fixture: ComponentFixture<RestaurarConPreguntaRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurarConPreguntaRestauranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurarConPreguntaRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
