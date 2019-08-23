import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryAddComponent } from './country-add.component';

describe('CountryAddComponent', () => {
  let component: CountryAddComponent;
  let fixture: ComponentFixture<CountryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
