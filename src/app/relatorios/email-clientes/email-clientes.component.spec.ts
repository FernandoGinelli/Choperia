import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailClientesComponent } from './email-clientes.component';

describe('EmailClientesComponent', () => {
  let component: EmailClientesComponent;
  let fixture: ComponentFixture<EmailClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailClientesComponent]
    });
    fixture = TestBed.createComponent(EmailClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
