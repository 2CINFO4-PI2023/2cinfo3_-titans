import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { LivraisonComponent } from './livraison.component';
import { LivraisonDetailComponent } from './livraisonDetail.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

const livraisonRoutes: Route[] = [
    {
        path     : '',
        component: LivraisonComponent
    },
    {
        path     : 'add',
        component: LivraisonDetailComponent
    },
    {
        path     : 'update/:id',
        component: LivraisonDetailComponent
    }
];

@NgModule({
    declarations: [
        LivraisonComponent,
        LivraisonDetailComponent
        ],
    imports     : [
        RouterModule.forChild(livraisonRoutes),
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        FuseAlertModule,
        CommonModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        MatSortModule
    ]
})
export class LivraisonModule
{
}
