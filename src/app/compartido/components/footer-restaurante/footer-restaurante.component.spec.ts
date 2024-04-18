import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterRestauranteComponent } from './footer-restaurante.component';

describe('FooterRestauranteComponent', () => {
  let component: FooterRestauranteComponent;
  let fixture: ComponentFixture<FooterRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterRestauranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
