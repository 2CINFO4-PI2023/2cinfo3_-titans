import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { UserService } from 'app/core/user/user.service';
import { ConfirmDialogComponent } from 'app/shared/dialog/confirm-dialog.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
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
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
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
                this.showAlert = false
                if(this.userService.getLoggedInUser()._id == userId){
                    this.alert = {
                        type: 'error',
                        message:
                            "You can't delete your owen account",
                    };
                    this.showAlert = true
                    return
                }
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
        this.showAlert = false
        if(this.userService.getLoggedInUser()._id == userId){
            value.source.checked = true;
            this.alert = {
                type: 'error',
                message:
                    "You can't disable your owen account",
            };
            this.showAlert = true
            return
        }
        this.userService.toggleConfirmation(userId,value.checked).subscribe((res)=>{
        },(error)=>{
            // TODO Handle the error
        })
    }
}
