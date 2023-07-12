import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector     : 'app-plat',
    templateUrl  : './plat.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PlatComponent
{
    platsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['name', 'price', 'ingredients',"actions"];
    /**
     * Constructor
     */
    constructor()
    {
        this.platsDataSource.data = [
            {
                id : 1,
                name: "french fries",
                price: "100",
                ingredients: ["1","2"]
            }
        ];
    }
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
