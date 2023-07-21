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

import { EventComponent } from './event.component';
import { EventDetailComponent } from './eventDetail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';


const eventRoutes: Routes = [
  {
    path: '',
    component: EventComponent,
  },
  {
    path: 'add-event',
    component: EventDetailComponent,
  },
  {
    path: 'update-event/:id',
    component: EventDetailComponent,
  },
];

@NgModule({
  declarations: [EventComponent, EventDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(eventRoutes),
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
export class EventModule {}
