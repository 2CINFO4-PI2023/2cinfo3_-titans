import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PlatService } from 'app/core/plat/plat.service';
import { Plat } from 'app/core/plat/plat.types';

@Component({
    selector: 'app-plat',
    templateUrl: './plat.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PlatComponent {
    platsDataSource: MatTableDataSource<Plat> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['name', 'price', 'ingredients', "actions"];
    /**
     * Constructor
     */
    constructor(private platService: PlatService, private router: Router) {
        this.platService.getPlats().subscribe(res => {
            console.log(res)
            this.platsDataSource.data = res;
        })
    }
    buildIngredients(str: object) {
        const keys = Object.keys(str);
        let ch: string = "";
        keys.forEach(key => {
            ch += `${key} : ${str[key]},`;
        })
        return ch;
    }
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    reload() {
        this.reloadComponent(false, 'plat');
    }

    reloadCurrent() {
        this.reloadComponent(true);
    }
    reloadComponent(self: boolean, urlToNavigateTo?: string) {
        //skipLocationChange:true means dont update the url to / when navigating
        console.log("Current route I am on:", this.router.url);
        const url = self ? this.router.url : urlToNavigateTo;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([`/${url}`]).then(() => {
                console.log(`After navigation I am on:${this.router.url}`)
            })
        })
    }

    reloadPage() {
        window.location.reload()
    }
    deletePlat(platId: string): void {
        this.platService.deletePlat(platId).subscribe(
            () => {
                this.reload()
            },
            (error) => {
                console.log(error);
            }

        );
    }
}
