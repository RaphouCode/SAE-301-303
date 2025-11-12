import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierComponentComponent } from './panier-component.component';

describe('PanierComponentComponent', () => {
  let component: PanierComponentComponent;
  let fixture: ComponentFixture<PanierComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanierComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanierComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
