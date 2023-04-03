import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VincularClienteComponent } from './vincular-cliente.component';

describe('VincularClienteComponent', () => {
  let component: VincularClienteComponent;
  let fixture: ComponentFixture<VincularClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VincularClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VincularClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
