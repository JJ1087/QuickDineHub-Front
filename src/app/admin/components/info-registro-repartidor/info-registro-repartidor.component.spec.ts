import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRegistroRepartidorComponent } from './info-registro-repartidor.component';

describe('InfoRegistroRepartidorComponent', () => {
  let component: InfoRegistroRepartidorComponent;
  let fixture: ComponentFixture<InfoRegistroRepartidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoRegistroRepartidorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoRegistroRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
