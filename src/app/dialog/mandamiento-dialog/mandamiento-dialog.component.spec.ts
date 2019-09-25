import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MandamientoDialogComponent } from './mandamiento-dialog.component';

describe('MandamientoDialogComponent', () => {
  let component: MandamientoDialogComponent;
  let fixture: ComponentFixture<MandamientoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandamientoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandamientoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
