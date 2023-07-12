import { NgModule } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { PlatComponent } from 'app/modules/admin/plat/plat.component';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: PlatComponent
    }
];

@NgModule({
    declarations: [
        PlatComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        MatTableModule,
        MatButtonModule,
        MatDialogModule
    ]
})
export class PlatModule
{
}
