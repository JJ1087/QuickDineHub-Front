import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisosPrivacidadComponent } from './avisos-privacidad.component';

describe('AvisosPrivacidadComponent', () => {
  let component: AvisosPrivacidadComponent;
  let fixture: ComponentFixture<AvisosPrivacidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvisosPrivacidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvisosPrivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
