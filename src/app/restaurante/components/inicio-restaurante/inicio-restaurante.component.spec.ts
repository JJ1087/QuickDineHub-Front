import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioRestauranteComponent } from './inicio-restaurante.component';

describe('InicioRestauranteComponent', () => {
  let component: InicioRestauranteComponent;
  let fixture: ComponentFixture<InicioRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InicioRestauranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicioRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
