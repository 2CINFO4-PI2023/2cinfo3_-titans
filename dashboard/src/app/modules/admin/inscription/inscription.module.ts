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

import { InscriptionComponent } from './inscription.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { InscriptionDetailComponent } from './inscriptionDetail.component';


const inscriptionRoutes: Routes = [
  {
    path: '',
    component: InscriptionComponent,
  },
  {
    path: 'add-inscription',
    component: InscriptionDetailComponent,
  },
  {
    path: 'update-inscription/:id',
    component: InscriptionDetailComponent,
  },
];

@NgModule({
  declarations: [InscriptionComponent, InscriptionDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inscriptionRoutes),
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
export class InscriptionModule {}
