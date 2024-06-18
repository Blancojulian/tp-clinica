import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDiasComponent } from './listado-dias.component';

describe('ListadoDiasComponent', () => {
  let component: ListadoDiasComponent;
  let fixture: ComponentFixture<ListadoDiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoDiasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
