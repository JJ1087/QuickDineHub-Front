import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeComponent2 } from './mensaje.component';

describe('MensajeComponent', () => {
  let component: MensajeComponent2;
  let fixture: ComponentFixture<MensajeComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MensajeComponent2]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
