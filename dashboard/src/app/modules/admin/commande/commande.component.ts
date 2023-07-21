import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { CommandeService } from 'app/core/commande/commande.service';
import { UserService } from 'app/core/user/user.service';
import { ConfirmDialogCommandeComponent } from 'app/shared/dialog-commande/confirm-dialog-commande.component';
import { ConfirmDialogComponent } from 'app/shared/dialog/confirm-dialog.component';

@Component({
    selector: 'app-commande',
    templateUrl: './commande.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CommandeComponent implements OnInit {
    commandesDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = [
        'id',
        'user',
        'totalPrice',
        'orderStatus',
        'actions',
    ];

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    filterValues: { [key: string]: string } = {
        user: '',
    };
    sortField: string = '';
    sortOrder: 'asc' | 'desc' = 'asc';
    pageSize: number = 10;
    currentPage: number = 1;
    totalItems: number = 0;
    ngOnInit(): void {
        this.getCommandes();

    }
    /**
     * Constructor
     */
    constructor(
        private commandeService: CommandeService,
        private userService: UserService,
        private dialog: MatDialog,
        private router: Router
    ) {}

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    getCommandes() {
        this.commandeService
            .getCommandes(
                this.currentPage,
                this.pageSize,
                this.filterValues,
                this.sortField,
                this.sortOrder
            )
            .subscribe(
                (data: any) => {
                    this.commandesDataSource.data = data;
                    this.totalItems = data.length;
                    this.commandesDataSource.data.forEach((commande) => {
                        this.userService.getUser(commande.user).subscribe(
                            (data: any) => {
                                commande.userName = data.name;
                                console.log('user',this.commandesDataSource);
        
                            },
                            (err) => {
                                console.log('errors: ', err);
                            }
                        );
                    });
                },
                (err) => {
                    console.log('errors: ', err);
                }
            );
 
            console.log('commandesDataSource',this.commandesDataSource);

    }

    reload() {
        this.reloadComponent(false, 'commandes');
    }
    applyFilters() {
        this.currentPage = 1;
        this.getCommandes();
    }
    reloadCurrent() {
        this.reloadComponent(true);
    }
    reloadComponent(self: boolean, urlToNavigateTo?: string) {
        const url = self ? this.router.url : urlToNavigateTo;
        this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
                this.router.navigate([`/${url}`]).then(() => {});
            });
    }

    reloadPage() {
        window.location.reload();
    }
    deleteCommande(id: string): void {
        const dialogRef = this.dialog.open(ConfirmDialogCommandeComponent, {
            width: '400px',
            data: { id },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === true) {
                this.showAlert = false;

                this.commandeService.deleteCommande(id).subscribe(
                    () => {
                        this.reload();
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        });
    }
}
