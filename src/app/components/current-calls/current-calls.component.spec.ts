import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCallsComponent } from './current-calls.component';

describe('CurrentCallsComponent', () => {
  let component: CurrentCallsComponent;
  let fixture: ComponentFixture<CurrentCallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
