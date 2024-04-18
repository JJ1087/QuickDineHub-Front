import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActivacionPerfilesComponent } from './admin-activacion-perfiles.component';

describe('AdminActivacionPerfilesComponent', () => {
  let component: AdminActivacionPerfilesComponent;
  let fixture: ComponentFixture<AdminActivacionPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminActivacionPerfilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminActivacionPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
