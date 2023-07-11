import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class UserComponent {
    usersDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['name', 'email', 'role', 'status'];
    /**
     * Constructor
     */
    constructor() {
        this.usersDataSource.data = [
            {
                id: 1,
                name: 'mohamed',
                email: 'test',
                role: 'client',
                confirmed: 1,
            },
        ];
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
