import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRepartidorComponent } from './registro-repartidor.component';

describe('RegistroRepartidorComponent', () => {
  let component: RegistroRepartidorComponent;
  let fixture: ComponentFixture<RegistroRepartidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroRepartidorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
