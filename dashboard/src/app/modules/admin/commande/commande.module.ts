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
import { CommandeComponent } from './commande.component';
import { CommandeDetailComponent } from './commandeDetail.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

const userRoutes: Route[] = [
    {
        path     : '',
        component: CommandeComponent
    },
    {
        path     : 'add',
        component: CommandeDetailComponent
    },
    {
        path     : 'update/:id',
        component: CommandeDetailComponent
    }
];

@NgModule({
    declarations: [
        CommandeComponent,
        CommandeDetailComponent
        ],
    imports     : [
        RouterModule.forChild(userRoutes),
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
export class CommandeModule
{
}
