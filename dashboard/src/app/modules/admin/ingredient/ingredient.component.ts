import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector     : 'app-ingredient',
    templateUrl  : './ingredient.component.html',
    encapsulation: ViewEncapsulation.None
})
export class IngredientComponent{
    ingredientsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['name', 'quantity','actions'];
    /**
     * Constructor
     */
    constructor()
    {
        this.ingredientsDataSource.data = [
            {
                id: 1,
                name: 'potato',
                quantity: 100,
            },
            {
                id: 2,
                name: 'tomato',
                quantity: 9,
            },
        ];
    }
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
