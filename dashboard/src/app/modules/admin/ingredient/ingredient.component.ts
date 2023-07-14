import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IngredientService } from 'app/core/ingredient/ingredient.service';
import { Ingredient } from 'app/core/ingredient/ingredient.types';

@Component({
    selector     : 'app-ingredient',
    templateUrl  : './ingredient.component.html',
    encapsulation: ViewEncapsulation.None
})
export class IngredientComponent{
    ingredientsDataSource: MatTableDataSource<Ingredient> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['name', 'quantity','actions'];
    /**
     * Constructor
     */
    constructor(private ingredientService: IngredientService)
    {
        this.ingredientService.getIngredients().subscribe(res =>{
            console.log(res);
            this.ingredientsDataSource.data= res;
        })
    }
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
