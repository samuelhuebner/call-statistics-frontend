import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllCallsComponent } from './all-calls.component';

describe('AllCallsComponent', () => {
    let component: AllCallsComponent;
    let fixture: ComponentFixture<AllCallsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [AllCallsComponent],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AllCallsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
