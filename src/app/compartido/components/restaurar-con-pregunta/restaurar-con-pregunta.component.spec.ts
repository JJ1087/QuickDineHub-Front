import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurarConPreguntaComponent } from './restaurar-con-pregunta.component';

describe('RestaurarConPreguntaComponent', () => {
  let component: RestaurarConPreguntaComponent;
  let fixture: ComponentFixture<RestaurarConPreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurarConPreguntaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurarConPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
