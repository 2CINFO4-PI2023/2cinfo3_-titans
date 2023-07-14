import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { IngredientComponent } from 'app/modules/admin/ingredient/ingredient.component';
import { IngredientDetailComponent } from './ingredientDetail.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FuseAlertModule } from '@fuse/components/alert';

const ingredientRoutes: Route[] = [
    {
        
        path     : '',
        component: IngredientComponent
    },
    {
        path     : 'add',
        component: IngredientDetailComponent
    },
    {
        path     : 'update/:id',
        component: IngredientDetailComponent
    }
];

@NgModule({
    declarations: [
        IngredientComponent,
        IngredientDetailComponent
    ],
    imports     : [
        RouterModule.forChild(ingredientRoutes),
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
        MatSlideToggleModule
    ]
})
export class IngredientModule
{
}
