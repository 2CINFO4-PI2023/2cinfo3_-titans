import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { EventTypeService } from 'app/core/eventType/eventType.service';
import { ConfirmDialogComponent } from 'app/shared/dialog/confirm-dialog.component';




@Component({
  selector: 'app-eventType',
  templateUrl: './eventType.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class EventTypeComponent implements OnInit {
  eventTypeTypes :any
  eventTypesDataSource: MatTableDataSource<any> = new MatTableDataSource();
  eventTypeTableColumns: string[] = [
    'name',
    
    'description',

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
    this.getEventTypes();
  }

  constructor(
    private eventTypeService: EventTypeService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getEventTypes() {
    this.eventTypeService
      .getEventTypes()
      .subscribe(
        (data: any) => {
          
          this.eventTypesDataSource.data = data;
          this.totalItems = data.total;
        },
        (err) => {
          console.log('errors: ', err);
        }
      );
  }

  applyFilters() {
    this.currentPage = 1;
    this.getEventTypes();
  }

  applySort(sort: { active: string; direction: 'asc' | 'desc' }) {
    this.sortField = sort.active;
    this.sortOrder = sort.direction;
    this.getEventTypes();
  }

  onPageChange(eventType: any) {
    this.currentPage = eventType.pageIndex + 1;
    this.pageSize = eventType.pageSize;
    this.getEventTypes();
  }

  goToAddEventType() {
    this.router.navigateByUrl('/add-eventType');
  }

  openConfirmationDialog(eventTypeId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { eventTypeId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.showAlert = false;
        this.eventTypeService.deleteEventType(eventTypeId).subscribe((res) => {
          this.eventTypesDataSource.data = this.eventTypesDataSource.data.filter((e) => {
            return e.id != eventTypeId;
          }); 
        });
      }
    });
  }
}
