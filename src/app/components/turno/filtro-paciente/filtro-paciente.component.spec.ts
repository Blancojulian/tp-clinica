import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPacienteComponent } from './filtro-paciente.component';

describe('FiltroPacienteComponent', () => {
  let component: FiltroPacienteComponent;
  let fixture: ComponentFixture<FiltroPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltroPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
