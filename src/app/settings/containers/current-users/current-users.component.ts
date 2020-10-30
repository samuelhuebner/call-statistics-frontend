import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/User.model';
import { CallApiService } from 'src/app/services/call-api/call-api.service';

@Component({
    selector: 'app-current-users',
    templateUrl: './current-users.component.html',
    styleUrls: ['./current-users.component.scss']
})
export class CurrentUsersComponent implements OnInit {
    public displayedColumns: string[] = ['username', 'name', 'isAdmin', 'isValidated'];
    public currentUsers = new MatTableDataSource<User>();
    constructor(
        private dataApi: CallApiService
    ) {}

    ngOnInit() {
        this.dataApi.getUsers()
            .then((users: User[]) => {
                this.currentUsers.data = users;
            });
    }
}