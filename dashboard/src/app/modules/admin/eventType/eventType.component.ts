import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { EventTypeService } from 'app/core/eventType/eventType.service';
import { ConfirmDialogComponent } from 'app/shared/dialog/confirm-dialog.component';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-eventType',
  templateUrl: './eventType.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class EventTypeComponent implements OnInit {
  eventTypes: any[] = [];
  eventTypesDataSource: MatTableDataSource<any> = new MatTableDataSource();
  eventTypeTableColumns: string[] = ['name', 'description', 'actions'];
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
  chartData: any[] = [];

  constructor(
    private eventTypeService: EventTypeService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEventTypes();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getEventTypes() {
    this.eventTypeService.getEventTypes().subscribe(
      (data: any) => {
        this.eventTypes = data;
        this.eventTypesDataSource.data = data;
        this.totalItems = data.total;

        this.getEventTypeCounts();
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

  deleteEvent(eventTypeId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { eventTypeId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.showAlert = false;
        this.eventTypeService.deleteEventType(eventTypeId).subscribe(() => {
          this.eventTypes = this.eventTypes.filter((e) => e.id !== eventTypeId);
          this.eventTypesDataSource.data = this.eventTypes;
          this.getEventTypeCounts(); // Update the chart after deletion
        });
      }
    });
  }

  deleteEventType(id: any) {
    this.eventTypeService.deleteEventType(id).subscribe(() => {
      this.getEventTypes();
    });
  }

  getEventTypeCounts() {
    this.chartData = []; // Clear the existing chart data

    for (const eventType of this.eventTypes) {
      this.eventTypeService.getEventCountByType(eventType._id).subscribe(
        (data: any) => {
          this.chartData.push({ eventType, data });
        },
        (err) => {
          console.log('errors: ', err);
        },
        () => {
          // After fetching all data, create the chart
          if (this.chartData.length === this.eventTypes.length) {
            this.createChart();
          }
        }
      );
    }
  }

  createChart() {
    const chartDataSets = [];

    for (const eventData of this.chartData) {
      const eventTypeNames = eventData.data.map((eventType: any) => eventType.name);
      const eventTypeCounts = eventData.data.map((eventType: any) => eventType.count);

      chartDataSets.push({
        label: eventData.eventType.name,
        data: eventTypeCounts,
        backgroundColor: this.getRandomColor(),
        borderWidth: 1,
      });
    }

    const ctx = document.getElementById('eventTypeChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.eventTypes.map((eventType: any) => eventType.name),
        datasets: chartDataSets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
