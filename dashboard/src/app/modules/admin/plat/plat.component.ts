import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PlatService } from 'app/core/plat/plat.service';
import { Plat } from 'app/core/plat/plat.types';

@Component({
    selector     : 'app-plat',
    templateUrl  : './plat.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PlatComponent
{
    platsDataSource: MatTableDataSource<Plat> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['name', 'price', 'ingredients',"actions"];
    /**
     * Constructor
     */
    constructor(private platService: PlatService)
    {
        this.platService.getPlats().subscribe(res=>{
            console.log(res)
            this.platsDataSource.data = res;
        })
    }
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
