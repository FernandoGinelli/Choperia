import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraClientesComponent } from './compra-clientes.component';

describe('CompraClientesComponent', () => {
  let component: CompraClientesComponent;
  let fixture: ComponentFixture<CompraClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompraClientesComponent]
    });
    fixture = TestBed.createComponent(CompraClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
