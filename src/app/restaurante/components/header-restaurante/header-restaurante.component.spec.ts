import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRestauranteComponent } from './header-restaurante.component';

describe('HeaderRestauranteComponent', () => {
  let component: HeaderRestauranteComponent;
  let fixture: ComponentFixture<HeaderRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderRestauranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
