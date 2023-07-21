import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IngredientService } from 'app/core/ingredient/ingredient.service';
import { Ingredient } from 'app/core/ingredient/ingredient.types';

@Component({
    selector: 'app-ingredient',
    templateUrl: './ingredient.component.html',
    encapsulation: ViewEncapsulation.None
})
export class IngredientComponent {
    ingredientsDataSource: MatTableDataSource<Ingredient> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['name', 'quantity', 'image', 'actions'];
    /**
     * Constructor
     */
    constructor(private ingredientService: IngredientService, private router: Router) {
        this.ingredientService.getIngredients().subscribe(res => {
            console.log(res);
            this.ingredientsDataSource.data = res;
        })
    }
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    reload() {
        this.reloadComponent(false, 'ingredient');
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
    deleteIngredient(ingredientId: string): void {
        this.ingredientService.deleteIngredient(ingredientId).subscribe(
            () => {
                this.reload()
            },
            (error) => {
                console.log(error);
            }

        );
    }
}
