import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { ConfirmDialogComponent } from 'app/shared/dialog/confirm-dialog.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {
    usersDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = [
        'name',
        'email',
        'role',
        'status',
        'actions',
    ];
    roles = {
        1: 'Client',
        99: 'Admin',
    };

    ngOnInit(): void {
        this.userService.getUsers().subscribe(
            (data: any) => {
                this.usersDataSource.data = data;
            },
            (err) => {
                console.log('errors: ', err);
            }
        );
    }
    /**
     * Constructor
     */
    constructor(private userService: UserService, private dialog: MatDialog,private router: Router) {}

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    goToAddUser(){
        this.router.navigateByUrl('/add')
    }
    openConfirmationDialog(userId: string): void {
        //FuseConfirmationDialogComponent
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: { userId },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === true) {
                this.userService.deleteUser(userId).subscribe((res) => {
                    this.usersDataSource.data =
                        this.usersDataSource.data.filter((u) => {
                            return u._id != userId;
                        });
                });
            }
        });
    }
    toggleConfirmation(userId:string,value:any){
        console.log({userId,checked:value.checked})
        this.userService.toggleConfirmation(userId,value.checked).subscribe((res)=>{
        },(error)=>{
            // TODO Handle the error
        })
    }
}
