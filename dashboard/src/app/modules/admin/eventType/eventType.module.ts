import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { EventTypeComponent } from './eventType.component';
import { EventTypeDetailComponent } from './eventTypeDetail.component';


const eventTypeRoutes: Routes = [
  {
    path: '',
    component: EventTypeComponent,
  },
  {
    path: 'add-eventType',
    component: EventTypeDetailComponent,
  },
  {
    path: 'update-eventType/:id',
    component: EventTypeDetailComponent,
  },
];

@NgModule({
  declarations: [EventTypeComponent, EventTypeDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(eventTypeRoutes),
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    FuseAlertModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatMomentDateModule
  ],
})
export class EventTypeModule {}
