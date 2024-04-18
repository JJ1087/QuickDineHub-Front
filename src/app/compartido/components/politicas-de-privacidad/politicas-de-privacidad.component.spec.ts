import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticasDePrivacidadComponent } from './politicas-de-privacidad.component';

describe('PoliticasDePrivacidadComponent', () => {
  let component: PoliticasDePrivacidadComponent;
  let fixture: ComponentFixture<PoliticasDePrivacidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoliticasDePrivacidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoliticasDePrivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
