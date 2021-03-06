import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoloComponent } from './polo.component';

describe('LookupQuoteComponent', () => {
  let component: PoloComponent;
  let fixture: ComponentFixture<PoloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
