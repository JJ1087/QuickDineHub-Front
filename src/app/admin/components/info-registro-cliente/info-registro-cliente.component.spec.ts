import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRegistroClienteComponent } from './info-registro-cliente.component';

describe('InfoRegistroClienteComponent', () => {
  let component: InfoRegistroClienteComponent;
  let fixture: ComponentFixture<InfoRegistroClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoRegistroClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoRegistroClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
