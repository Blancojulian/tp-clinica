import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionRegistroComponent } from './seleccion-registro.component';

describe('SeleccionRegistroComponent', () => {
  let component: SeleccionRegistroComponent;
  let fixture: ComponentFixture<SeleccionRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionRegistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeleccionRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
