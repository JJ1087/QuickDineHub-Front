import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurarConCorreoComponent } from './restaurar-con-correo.component';

describe('RestaurarConCorreoComponent', () => {
  let component: RestaurarConCorreoComponent;
  let fixture: ComponentFixture<RestaurarConCorreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurarConCorreoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurarConCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
