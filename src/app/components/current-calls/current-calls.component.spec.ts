import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CurrentCallsComponent } from './current-calls.component';

describe('CurrentCallsComponent', () => {
    let component: CurrentCallsComponent;
    let fixture: ComponentFixture<CurrentCallsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [CurrentCallsComponent],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CurrentCallsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
