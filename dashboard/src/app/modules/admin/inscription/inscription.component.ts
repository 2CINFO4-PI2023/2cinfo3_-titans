import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { InscriptionService } from 'app/core/inscription/inscription.service';
import { ConfirmDialogComponent } from 'app/shared/dialog/confirm-dialog.component';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
}) 
export class InscriptionComponent implements OnInit {
  inscriptionTypes: any;
  inscriptionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
  inscriptionTableColumns: string[] = [
    'userId',
    'name',
    'email',
    'status',
    'actions'
  ];
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  showAlert: boolean = false;
  filterValues: { [key: string]: string } = {
    name: '',
    address: '',
  };
  sortField: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  pageSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0;

  ngOnInit(): void {
    this.getInscriptions();
  }

  constructor(
    private inscriptionService: InscriptionService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getInscriptions() {
    this.inscriptionService
      .getInscriptions()
      .subscribe(
        (data: any) => {
          this.inscriptionsDataSource.data = data;
          this.totalItems = data.total;
        },
        (err) => {
          console.log('errors: ', err);
        }
      );
  }

  applyFilters() {
    this.currentPage = 1;
    this.getInscriptions();
  }

  applySort(sort: { active: string; direction: 'asc' | 'desc' }) {
    this.sortField = sort.active;
    this.sortOrder = sort.direction;
    this.getInscriptions();
  }

  onPageChange(inscription: any) {
    this.currentPage = inscription.pageIndex + 1;
    this.pageSize = inscription.pageSize;
    this.getInscriptions();
  }

  goToAddInscription() {
    this.router.navigateByUrl('/add-inscription');
  }

  openConfirmationDialog(inscriptionId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { inscriptionId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.showAlert = false;
        this.inscriptionService.deleteInscription(inscriptionId).subscribe((res) => {
          this.inscriptionsDataSource.data = this.inscriptionsDataSource.data.filter((e) => {
            return e.id != inscriptionId;
          });
        });
      }
    });
  }
}
