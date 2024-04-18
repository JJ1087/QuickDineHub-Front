import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestProductosComponent } from './rest-productos.component';

describe('RestProductosComponent', () => {
  let component: RestProductosComponent;
  let fixture: ComponentFixture<RestProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestProductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
