import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoppComponent } from './chopp.component';

describe('ChoppComponent', () => {
  let component: ChoppComponent;
  let fixture: ComponentFixture<ChoppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
