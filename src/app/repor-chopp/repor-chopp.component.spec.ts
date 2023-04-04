import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporChoppComponent } from './repor-chopp.component';

describe('ReporChoppComponent', () => {
  let component: ReporChoppComponent;
  let fixture: ComponentFixture<ReporChoppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporChoppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporChoppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
