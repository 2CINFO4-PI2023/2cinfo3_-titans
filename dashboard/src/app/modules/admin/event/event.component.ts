import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { EventService } from 'app/core/event/event.service';
import { ConfirmDialogComponent } from 'app/shared/dialog/confirm-dialog.component';




@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class EventComponent implements OnInit {
  eventTypes :any
  eventsDataSource: MatTableDataSource<any> = new MatTableDataSource();
  eventTableColumns: string[] = [
    'image',
    'name',
    'date',
    'address',
    'event_capacity',
    'availablePlaces',
    'eventType',
    
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
    this.getEvents();
  }

  constructor(
    private eventService: EventService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getEvents() {
    this.eventService
      .getEvents()
      .subscribe(
        (data: any) => {
          
          this.eventsDataSource.data = data;
          this.totalItems = data.total;
        },
        (err) => {
          console.log('errors: ', err);
        }
      );
  }

  applyFilters() {
    this.currentPage = 1;
    this.getEvents();
  }

  applySort(sort: { active: string; direction: 'asc' | 'desc' }) {
    this.sortField = sort.active;
    this.sortOrder = sort.direction;
    this.getEvents();
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getEvents();
  }

  goToAddEvent() {
    this.router.navigateByUrl('/add-event');
  }

  openConfirmationDialog(eventId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { eventId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.showAlert = false;
        this.eventService.deleteEvent(eventId).subscribe((res) => {
          this.eventsDataSource.data = this.eventsDataSource.data.filter((e) => {
            return e.id != eventId;
          });
        });
      }
    });
  }
  deleteEvent(id:any){
    this.eventService.deleteEvent(id).subscribe(()=>{this.getEvents();})
  }
}
