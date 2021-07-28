import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QueueStatusComponent } from './queue-status.component';

describe('QueueStatusComponent', () => {
  let component: QueueStatusComponent;
  let fixture: ComponentFixture<QueueStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
