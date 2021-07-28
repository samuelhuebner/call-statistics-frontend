import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoadingIndicatorService {
    private loading = false;

    constructor() {}

    public show(): void {
        this.loading = true;
    }

    public hide(): void {
        this.loading = false;
    }

    public getLoading(): boolean {
        return this.loading;
    }
}
