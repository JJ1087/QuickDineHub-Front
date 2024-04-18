import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoEnvioComponent } from './estado-envio.component';

describe('EstadoEnvioComponent', () => {
  let component: EstadoEnvioComponent;
  let fixture: ComponentFixture<EstadoEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstadoEnvioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadoEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
