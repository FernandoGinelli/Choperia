import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirarProdutoComponent } from './retirar-produto.component';

describe('RetirarProdutoComponent', () => {
  let component: RetirarProdutoComponent;
  let fixture: ComponentFixture<RetirarProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirarProdutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetirarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




