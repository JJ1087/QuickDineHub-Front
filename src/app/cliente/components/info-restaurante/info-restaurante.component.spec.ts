import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRestauranteComponent } from './info-restaurante.component';

describe('InfoRestauranteComponent', () => {
  let component: InfoRestauranteComponent;
  let fixture: ComponentFixture<InfoRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoRestauranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
