import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { IngredientComponent } from 'app/modules/admin/ingredient/ingredient.component';

const ingredientRoutes: Route[] = [
    {
        path     : '',
        component: IngredientComponent
    }
];

@NgModule({
    declarations: [
        IngredientComponent
    ],
    imports     : [
        RouterModule.forChild(ingredientRoutes),
        MatTableModule,
        MatButtonModule,
        MatDialogModule
    ]
})
export class IngredientModule
{
}
