import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRepartidorComponent } from './header-repartidor.component';

describe('HeaderRepartidorComponent', () => {
  let component: HeaderRepartidorComponent;
  let fixture: ComponentFixture<HeaderRepartidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderRepartidorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
