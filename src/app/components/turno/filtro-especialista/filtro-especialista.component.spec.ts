import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroEspecialistaComponent } from './filtro-especialista.component';

describe('FiltroEspecialistaComponent', () => {
  let component: FiltroEspecialistaComponent;
  let fixture: ComponentFixture<FiltroEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroEspecialistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltroEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
