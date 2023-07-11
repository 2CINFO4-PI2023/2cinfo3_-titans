import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
const userRoutes: Route[] = [
    {
        path     : '',
        component: UserComponent
    }
];

@NgModule({
    declarations: [
        UserComponent
    ],
    imports     : [
        RouterModule.forChild(userRoutes),
        MatTableModule
    ]
})
export class UserModule
{
}
