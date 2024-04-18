import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRegistroRestauranteComponent } from './info-registro-restaurante.component';

describe('InfoRegistroRestauranteComponent', () => {
  let component: InfoRegistroRestauranteComponent;
  let fixture: ComponentFixture<InfoRegistroRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoRegistroRestauranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoRegistroRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
