import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { PlatComponent } from 'app/modules/admin/plat/plat.component';
import { PlatDetailComponent } from './platDetail.component';

const platRoutes: Route[] = [
    {
        path: '',
        component: PlatComponent
    },
    {
        path: 'add',
        component: PlatDetailComponent
    },
    {
        path: 'update/:id',
        component: PlatDetailComponent
    }
];

@NgModule({
    declarations: [
        PlatComponent,
        PlatDetailComponent
    ],
    imports: [
        RouterModule.forChild(platRoutes),
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        FuseAlertModule,
        CommonModule,
        MatSlideToggleModule
    ]
})
export class PlatModule {
}
