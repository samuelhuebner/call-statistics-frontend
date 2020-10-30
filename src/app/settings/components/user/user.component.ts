import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    constructor(
    ) {}

    @Input() private user: User;

    ngOnInit() {
    }
}