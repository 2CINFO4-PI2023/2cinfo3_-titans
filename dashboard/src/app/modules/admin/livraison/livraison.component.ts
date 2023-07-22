import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { CommandeService } from 'app/core/commande/commande.service';
import { LivraisonService } from 'app/core/livraison/livraison.service';
import { UserService } from 'app/core/user/user.service';
import { ConfirmDialogCommandeComponent } from 'app/shared/dialog-commande/confirm-dialog-commande.component';
import { ConfirmDialogComponent } from 'app/shared/dialog/confirm-dialog.component';

@Component({
    selector: 'app-livraison',
    templateUrl: './livraison.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class LivraisonComponent implements OnInit {
    livraisonDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = [
        'commande',
        'deliveryman',
        'status',
  
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
        this.getLivraisons();

    }
    /**
     * Constructor
     */
    constructor(
        private livraisonService: LivraisonService,
        private userService: UserService,
        private dialog: MatDialog,
        private router: Router
    ) {}

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    getLivraisons() {
        this.livraisonService
            .getLivraisons(
                this.currentPage,
                this.pageSize,
                this.filterValues,
                this.sortField,
                this.sortOrder
            )
            .subscribe(
                (data: any) => {
                    this.livraisonDataSource.data = data;
                    this.totalItems = data.length;
   
                },
                (err) => {
                    console.log('errors: ', err);
                }
            );
 
            console.log('livraisonsDataSource',this.livraisonDataSource);

    }

    reload() {
        this.reloadComponent(false, 'livraisons');
    }
    applyFilters() {
        this.currentPage = 1;
        this.getLivraisons();
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
    deleteLivraison(id: string): void {
        const dialogRef = this.dialog.open(ConfirmDialogCommandeComponent, {
            width: '400px',
            data: { id },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === true) {
                this.showAlert = false;

                this.livraisonService.deleteCommande(id).subscribe(
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
