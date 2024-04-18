import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductoComponent } from './info-producto.component';

describe('InfoProductoComponent', () => {
  let component: InfoProductoComponent;
  let fixture: ComponentFixture<InfoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
